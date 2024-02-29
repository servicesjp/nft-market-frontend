import axios, { AxiosInstance } from "axios"

import { ObjectToQueryParam, SignatureCreator } from "./signature"
import hmacSHA256 from 'crypto-js/hmac-sha256'
import { ED25519 } from "./ed25519"
import { AuthSessionToken, authSession } from "../auth/auth-session"

const SIGNATURE_KEY = 'meteor:sign'

export interface SignatureData {
    key: {
        public: string,
        private: string
    },
    data: {
        PublicKey: string,
        Secret: string,
        Id: number
    }
}

export class NotAuthenticatedError extends Error {
    private _data: any

    constructor(message: string, data?: any) {
        super(message)
        this._data = data || {}
    }

    get data(): any {
        return this._data
    }
}

let currentSignature: SignatureData | null

export function setSignatureData(signatureData: SignatureData) {
    localStorage.setItem(SIGNATURE_KEY, JSON.stringify(signatureData))
    currentSignature = signatureData
}

async function getSignatureData(client: AxiosInstance): Promise<SignatureData> {
    if (currentSignature) {
        return currentSignature
    }


    const storedKey = localStorage.getItem(SIGNATURE_KEY) as string
    if (storedKey) {
        currentSignature = JSON.parse(storedKey) as SignatureData
        return currentSignature
    }

    const ed25519 = ED25519.getInstance()
    const key = ed25519.generateKey()
    const formData = new FormData()
    formData.append('PublicKey', key.public)
    formData.append('Platform', '0')

    const response = await client.post('/home/get-client/', formData)
    currentSignature = {
        key: key,
        data: response.data
    }
    localStorage.setItem(SIGNATURE_KEY, JSON.stringify(currentSignature))
    return currentSignature
}

interface SignedRequestParameters {
    method: 'POST' | 'GET'
    url: string
    requestBody: any
    options?: { encodeBody: boolean }
}

async function requestSigned(client: AxiosInstance, { method, url, requestBody, options = { encodeBody: true } }: SignedRequestParameters, authToken?: AuthSessionToken): Promise<any> {

    const fullUrl = process.env.NEXT_PUBLIC_EXCHANGE_BACKEND_BASE_URL + url
    const encrypted = await createSignedRequest(client, method, requestBody, fullUrl, authToken, options.encodeBody)
    const headers = {
        ...encrypted.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
        'CTime': 'now time' + Date.now() + 'offset ' + 0,
    }

    try {
        let res = await client.request({
            method: method,
            url: url,
            data: encrypted.body,
            headers: headers
        })
        return res
    } catch (error: any) {
        if (error.response?.status === 401 && authToken) {
            const message = "Unauthorized request, redirecting to login"
            throw new NotAuthenticatedError(message, error.response)
        } else if (isInvalidServer(error)) {
            console.error(`Invalid server session, redirecting to app reset`)
            // window.location.href = '/app-reset'
        }
        throw error
    }
}

function isInvalidServer(error: any) {
    // This will happen when we have a auth session for a different backend, we have to clear everything and get a new signature
    const message = error?.response?.data?.Error
    return message && (message === 'App not found' || message.indexOf('Invalid Signature') >= 0)
}

interface SignedRequest {
    body: any,
    headers: any
}

async function createSignedRequest(client: AxiosInstance, method: 'GET' | 'POST' | 'SOCKET', requestBody: any, fullUrl: string, authToken?: AuthSessionToken, encodeBody: boolean = true): Promise<SignedRequest> {
    const signatureData = await getSignatureData(client)
    const sig = new SignatureCreator(signatureData)
    let body = requestBody
    if (encodeBody) {
        body = await sig.encryptObject(requestBody)
    }

    const signature = sig.generateSignature(fullUrl, method, body)

    let authHeaders = {}
    if (authToken) {
        authHeaders = {
            'user-auth-token': hmacSHA256(authToken.token, signature.key).toString(),
            'x-ti': authToken.tokenId
        }
    }
    return {
        body,
        headers: {
            'x-ref': signatureData.data.Id,
            'x-sig': signature.key,
            'x-nonce': signature.nonce.toString(),
            ...authHeaders
        }
    }
}

export interface SocketCredentials {
    XSig: string,
    XNonce: string,
    XRef: string,
    UserAuthToken?: string,
    XTi: string
}

export class EncryptedExchangeClient {
    private client: AxiosInstance

    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_EXCHANGE_BACKEND_BASE_URL!,
        })
    }

    private getSessionToken(): AuthSessionToken {
        const token = authSession.authToken || authSession.temporalSession
        if (!token) {
            throw new NotAuthenticatedError("Expected to make a request with a token, but no token was found")
        }
        return token
    }

    private async request(params: { method: 'POST' | 'GET', url: string, requestBody: any, options?: { encodeBody: boolean } }, useToken?: boolean) {
        try {
            const authToken = (useToken || false) ? this.getSessionToken() : undefined
            let res = await requestSigned(this.client, params, authToken)
            return { ...res, Status: true, Message: "No Error" }
        }
        catch (error: any) {
            if (error instanceof NotAuthenticatedError) {
                authSession.clear()
                console.error(error.message, error.data)
                //window.location.href = domainsConfig.urlMeteor + '/login'
            }
            // return {
            //     Status: error.response.data.Success,
            //     Message: error.response.data.Error,
            //     // Error: error.response.data.Error,
            //     // Success:error.response.data.Success,
            // };
            let err = {
                ...error,
                Status: error.response?.data?.Success || false,
                Message: error.response?.data?.Error || "Something went wrong, please try again later"

            }
            throw err
        }
    }

    // async get(url: string, options: { useToken: boolean } = { useToken: false }): Promise<any> {
    //     return await this.request({ method: 'GET', url, requestBody: {}, options: { encodeBody: false } }, options.useToken);
    // }
    async get(url1: string, options: { useToken: boolean, body?: any } = { useToken: false }): Promise<any> {
        let url: string = url1 + ObjectToQueryParam(options?.body ? options?.body : {})
        return await this.request({ method: 'GET', url, requestBody: {}, options: { encodeBody: false } }, options.useToken)
    }

    async post(url: string, requestBody: any, options: { encodeBody: boolean, useToken?: boolean } = { encodeBody: true }): Promise<any> {
        return await this.request({ method: 'POST', url, requestBody, options: { encodeBody: options.encodeBody } }, options.useToken || false)
    }

    async getSocketCredentials(url: string): Promise<SocketCredentials> {
        const request = await createSignedRequest(this.client, 'SOCKET', {}, url, this.getSessionToken(), false)
        return {
            XSig: request.headers['x-sig'],
            XNonce: request.headers['x-nonce'],
            XRef: request.headers['x-ref'].toString(), // must be string
            UserAuthToken: request.headers['user-auth-token'],
            XTi: request.headers['x-ti']
        }
    }
}

let exchangeClient: EncryptedExchangeClient | null = null

export function getExchangeClient(): EncryptedExchangeClient {
    if (!exchangeClient) {
        exchangeClient = new EncryptedExchangeClient()
    }
    return exchangeClient
}

export function getParsedErrorMessage(error: any, logError?: boolean) {
    const message = error?.response?.data?.Error || 'Something went wrong, please try again later'
    if (logError !== false) {
        console.error(error)
    }
    return message
}