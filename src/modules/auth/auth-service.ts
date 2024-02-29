import UserSession from "@/types/UserSession"
import { SocketCredentials, getExchangeClient } from "../encrypted-exchange/encrypted-exchange-client"
import { authSession } from "./auth-session"

export enum TwoFactorMethod {
    Disabled = 0,
    Google = 1,
    SMS = 2,
    SMSGoogle = 3,
}

export interface LoginResult {
    error?: string
    loginCompleted: boolean
    requireTwoFactor: boolean
    activationRequired?: boolean
    deviceActivationRequired?: boolean
    userSession?: UserSession
}

export interface RegisterResult {
    error?: string
    token?: string
}

export interface VerifyCodeResult {
    error?: string
    token?: string
}

export interface PasswordResetRequestResult {
    error?: string
    token?: string
}

export interface ChangePasswordResult {
    error?: string
}

export const LOGIN_ERROR_ACTIVATION_REQUIRED = 'ACTIVATION_REQUIRED'

const client = getExchangeClient()

const USER_ID_KEY = 'meteor::auth::userId'
const USER_SESSION = 'meteor::userSession'

function setUserId(userId: string) {
    localStorage.setItem(USER_ID_KEY, userId)
}

export function setUserSession(userSession: UserSession) {
    if (Object.keys(userSession).length > 0)
        localStorage.setItem(USER_SESSION, JSON.stringify(userSession))
}

export function getUserId(): string | null {
    const userId = localStorage.getItem(USER_ID_KEY)
    if (!userId) {
        return null
    }
    return userId
}

export function getUserSession(): UserSession | null {
    const userSessionStr = localStorage.getItem(USER_SESSION)

    if (userSessionStr) {
        const userSession = JSON.parse(userSessionStr) as UserSession
        if (Object.keys(userSession).length === 0) {
            return null
        }
        else return userSession
    }
    else return null
}

export async function getSocketAuthCreds(url: string): Promise<SocketCredentials> {
    return client.getSocketCredentials(url)
}

export async function authenticateWithTwoFactor(code: string, isPhone: boolean = false): Promise<{ error?: string }> {
    try {
        await client.post('/account/authenticate-2fa/', { 'Code': code, PhoneVerif: isPhone }, { useToken: true, encodeBody: false })
        return {}
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            return { error: message }
        }
        console.error(error)
        return { error: 'Something went wrong, please try again later' }
    }
}

async function resendVerificationEmail(email: string): Promise<{ error?: string }> {
    try {
        await client.post('/account/resend-email/', { Email: email, Id: '0' }, { encodeBody: false })
        return {}
    } catch (err) {
        console.error(err)
        return { error: 'Something went wrong, please try again later' }
    }
}

export function logout() {
    localStorage.removeItem(USER_ID_KEY)
    authSession.clear()
}

const TWO_FACTOR_METHOD_KEY = 'meteor::twoFactorMethod'

export function getAvailableTwoFactorMethod(): TwoFactorMethod {
    const method = sessionStorage.getItem(TWO_FACTOR_METHOD_KEY)
    if (!method) {
        return TwoFactorMethod.Disabled
    }
    return parseInt(method) as TwoFactorMethod
}

export async function login(email: string, password: string): Promise<LoginResult> {
    try {
        const response = await client.post('/account/login/', { 'Email': email, 'Password': password })
        const userSession: UserSession = response.data
        userSession.Email = email
        const token = userSession.Token
        // console.log('DeviceAuthorized = ' + response.data['DeviceAuthorized'])
        if (response.data['DeviceAuthorized'] === false) {
            return { loginCompleted: false, requireTwoFactor: false, deviceActivationRequired: true }
        }

        if (!token) {
            throw new Error('No token in response')
        }
        const requireTwoFactor = userSession.TwoFa || false
        const twoFactorMethod = (userSession.TwoFactor || 0) as TwoFactorMethod
        sessionStorage.setItem(TWO_FACTOR_METHOD_KEY, twoFactorMethod.toString())
        const tokenId = userSession.TokenId.toString()
        const userId = userSession.UserId.toString()
        setUserId(userId)
        setUserSession(userSession)
        if (requireTwoFactor) {
          authSession.temporalSession = { token, tokenId };
        } else {
          authSession.set({ token, tokenId });
        }
        return { loginCompleted: true, requireTwoFactor, userSession }
    } catch (error: any) {
        // debugger;
        const message = error?.response?.data?.Error
        if (message) {
            if (message === 'You account is not acitvated') {
                const resetResponse = await resendVerificationEmail(email)
                if (resetResponse.error) {
                    return { error: resetResponse.error, activationRequired: false, loginCompleted: false, requireTwoFactor: false }
                }
                // return { error: LOGIN_ERROR_ACTIVATION_REQUIRED }
                return { error: message, activationRequired: true, loginCompleted: false, requireTwoFactor: false }
            }

            console.error(message)
            return { error: message, loginCompleted: false, requireTwoFactor: false }
        }
        console.error(error)
        return { error: 'Something went wrong, please try again later', loginCompleted: false, requireTwoFactor: false } as LoginResult
    }
}


export async function register(email: string, password: string): Promise<RegisterResult> {
    try {
        await client.post('/account/register/', { 'Email': email, 'Password': password, 'ConfirmPassword': password })
        return {} as RegisterResult
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            return { error: message } as RegisterResult
        }
        console.error(error)
        return { error: 'Something went wrong, please try again later' } as RegisterResult
    }
}

export async function verifySignUp(id: string, hash1: string, hash2: string): Promise<void> {
    try {
        await client.post('/account/verify-email', { Id: id, Hash1: hash1, Hash2: hash2 }, { encodeBody: false })
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            throw Error(message)
        }
        console.error(error)
        throw Error('Something went wrong, please try again later')
    }
}

export async function authorizeDevice(deviceId: string, hash: string): Promise<void> {
    try {
        await client.post('/accountsettings/get-device-info', { Id: deviceId, Hash: hash }, { encodeBody: false, useToken: false })
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            throw Error(message)
        }
        console.error(error)
        throw Error('Something went wrong, please try again later')
    }
}

export async function getSMSVerificationCode(): Promise<{ error?: string }> {
    try {
        await client.post('/account/get-verification-sms/', { 'Submit': '1' }, { useToken: true, encodeBody: false })
        return {}
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            return { error: message }
        }
        console.error(error)
        return { error: 'Something went wrong, please try again later' }
    }
}

export async function requestPasswordReset(email: string): Promise<PasswordResetRequestResult> {
    try {
        await client.post('/account/recover/', { 'Email': email }, { encodeBody: false })
        return {}
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            return { error: message } as PasswordResetRequestResult
        }
        console.error(error)
        return { error: 'Something went wrong, please try again later' } as PasswordResetRequestResult
    }
}

// Just a temporary workaround to make the changePassword function work with only a password same as v1 auth
// we can remove this and pass the variables in straight to changePassword once auth1 is removed
export function savePasswordChangeCredentials(id: string, hash1: string, hash2: string) {
    sessionStorage.setItem('passwordChangeCredentials', JSON.stringify({ id, hash1, hash2 }))
}

export async function resetPassword(password: string): Promise<ChangePasswordResult> {
    try {
        const { id, hash1, hash2 } = JSON.parse(sessionStorage.getItem('passwordChangeCredentials') || '{}')
        await client.post('/account/reset-password/', { 'Password': password, 'ConfirmPassword': password, 'Id': id, 'Hash1': hash1, 'Hash2': hash2 }, { encodeBody: false })
        return {}
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            return { error: message } as ChangePasswordResult
        }
        console.error(error)
        return { error: 'Something went wrong, please try again later' } as ChangePasswordResult
    }
}

export async function changePassword(password: string, newPassword: string, confirmPassword: string): Promise<ChangePasswordResult> {
    try {
        await client.post('/account/change-password/', { 'OldPassword': password, 'NewPassword': newPassword, 'ConfirmPassword': confirmPassword }, { encodeBody: true, useToken: true })
        return {}
    } catch (error: any) {
        const message = error?.response?.data?.Error
        if (message) {
            console.error(message)
            return { error: message } as ChangePasswordResult
        }
        console.error(error)
        return { error: 'Something went wrong, please try again later' } as ChangePasswordResult
    }
}