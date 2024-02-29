import axios, { AxiosInstance } from "axios"

class BackendNestClient {
    private client: AxiosInstance
    private header: any
    private token: String
    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        })
        this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJKYW1lcyJ9LCJpYXQiOjE2ODY3NTQ4NjV9.PhdiA2K-UV6sQ6ZgEkZOJwx44on4mMQE9k-jUZ6Le6c"
        this.header = {
            "x-access-token": `Bearer ${this.token}`
        }

    }


    private async request(params: { method: 'POST' | 'GET' | 'PATCH', url: string, data: any, params: any, token: any }) {
        return await this.client.request({
            method: params.method,
            maxBodyLength: Infinity,
            url: params.url,
            data: params.data,
            headers: params.token ? {
                "x-access-token": `Bearer ${params.token}`
            } : {},
            params: params.params ? params.params : {}
        })
    }
    private async requestFile(params: { url: string, data: any, token: any }) {
        return await this.client.request({
            method: 'POST',
            url: params.url,
            data: params.data,
            headers: {
                'Content-Type': 'multipart/form-data; charset=utf-8',
                "x-access-token": `Bearer ${params.token}`
            },
        })
    }

    async uploadFile(url: string, data: any, token: any): Promise<any> {
        return await this.requestFile({ url, data, token })
    }
    async get(url: string, data: any = {}, params: any, token: any): Promise<any> {
        return await this.request({ method: 'GET', url, data, params, token })
    }
    async post(url: string, data: any, params: any = {}, token: any): Promise<any> {
        console.log({ url, params, data, token })
        return await this.request({ method: 'POST', url, data, params, token })
    }
}

let backStrapiClient: BackendNestClient | null = null

export function getBackNestClient(): BackendNestClient {
    if (!backStrapiClient) {
        backStrapiClient = new BackendNestClient()
    }
    return backStrapiClient
}