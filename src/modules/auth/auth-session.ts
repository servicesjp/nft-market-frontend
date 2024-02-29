import { SignatureData, setSignatureData } from "../encrypted-exchange/encrypted-exchange-client"

export interface AuthSessionToken {
  token: string
  tokenId: string
  userId?: string
  email?: string
}

const KEYS = {
  TOKEN: 'meteor::auth::token',
  TOKEN_ID: 'meteor::auth::tokenId',
  USER_ID: 'meteor::auth::userId',
  EMAIL: 'meteor::auth::email'
}

class AuthSession {
  temporalSession: AuthSessionToken | undefined


  constructor() {
    if (typeof window !== "undefined") {
      let params = new URLSearchParams(window.location.search)
      let meteorSessionParam = params.get('token')
      let sessionFromParam = (meteorSessionParam ? JSON.parse(atob(meteorSessionParam)) : null) as any

      const signatureData: SignatureData = sessionFromParam?.appCredentials

      if (signatureData) {
        localStorage.setItem("meteor:sign", JSON.stringify(signatureData))
        setSignatureData(signatureData)
      }

      const { Token: token, TokenId: tokenId, UserId: userId, Email: email } = sessionFromParam?.userSession ?? {}

      if (token && tokenId && userId && email) {
        this.set({ token, tokenId, userId, email })
      }
    }
  }

  get authToken(): AuthSessionToken | undefined {
    // default to null if running server side
    if (typeof window === "undefined") return

    const tokenId = localStorage.getItem(KEYS.TOKEN_ID)
    const token = localStorage.getItem(KEYS.TOKEN)
    const userId = localStorage.getItem(KEYS.USER_ID)
    const email = localStorage.getItem(KEYS.EMAIL)

    if (tokenId && token && userId && email) {
      return {
        tokenId,
        token,
        userId,
        email
      } as AuthSessionToken
    }
    return
  }

  get hasSession(): boolean {
    return this.authToken !== undefined
  }

  set({ tokenId, token, userId, email }: AuthSessionToken) {
    token && localStorage.setItem(KEYS.TOKEN, token)
    tokenId && localStorage.setItem(KEYS.TOKEN_ID, tokenId)
    userId && localStorage.setItem(KEYS.USER_ID, userId)
    email && localStorage.setItem(KEYS.EMAIL, email)

    this.temporalSession = undefined //clearing temporal session;
    // since local storage isn't closed on browser close, store cookie
    const expireIn24h = new Date(Date.now() + 24 * 60 * 60 * 1000)
    document.cookie = `hasSessionUntil=${expireIn24h.getTime()}`
  }

  clear() {
    localStorage.removeItem(KEYS.TOKEN)
    localStorage.removeItem(KEYS.TOKEN_ID)
  }
}

export const authSession = new AuthSession()

function clearOldSession() {
  const cookie = window.document.cookie
  const cookieExpiresAt = cookie.split(';').find(c => c.trim().startsWith('hasSessionUntil='))

  // No cookie, clear session. The cookie will have been removed when browser closes
  if (!cookieExpiresAt) {
    authSession.clear()
  }

  // If cookie is expired, clear session
  const expiresAt = parseInt(cookieExpiresAt?.split('=')[1] || '0')
  if (Date.now() > expiresAt) {
    authSession.clear()
  }
}

// If we are running client side
if (typeof window !== 'undefined') {
  clearOldSession()
}