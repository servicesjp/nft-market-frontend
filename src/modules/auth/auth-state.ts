import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { authSession } from './auth-session'

export const isLoggedInAtom = atom(false)

isLoggedInAtom.onMount = (setAtom) => {
    setAtom(authSession.hasSession)
}

export const forgotEmail = atom<string>("")
interface SignUpVerificationState {
    email?: string,
    token?: string
}

export const signUpVerificationAtom = atomWithStorage<SignUpVerificationState>('meteor:auth:signup:verification', {}, createJSONStorage<SignUpVerificationState>(() => sessionStorage))

interface PasswordResetVerificationState {
    email?: string,
    token?: string
}

export const passwordResetVerificationAtom = atomWithStorage<PasswordResetVerificationState>('meteor:auth:password-reset:verification', {}, createJSONStorage<PasswordResetVerificationState>(() => sessionStorage))