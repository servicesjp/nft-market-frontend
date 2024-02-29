import { useSetAtom } from "jotai";
import { isLoggedInAtom } from "./auth-state";
import { logout } from "./auth-service";

/**
 * By using this hook, you can login and ensure the application state is kept correctly
 */
export function useLogout() {
    const setLoginState = useSetAtom(isLoggedInAtom)
    
    return () => {
        logout()
        setLoginState(false)
    }
}