// import { INullable, isBrowser } from "./common";

import { INullable, isBrowser } from "@/helpers/common";

export class StorageClass {
    private static instance: StorageClass;
    
    localStorage: any;
    constructor() {
        if (StorageClass.instance) {
            throw new Error("Error: Instantiation failed: Use Storage.getInstance() instead of new.");
        }
    }
    public static getInstance() {
        if (StorageClass.instance == null) {
            StorageClass.instance = new StorageClass();
        }
        return this.instance;
    }
    public async tryGet(name: string): Promise<INullable> {
        try {
            const value = await localStorage.getItem(name);
            return {
                hasValue: value !== null,
                value: value
            } as INullable;   
        } catch (error) {
            return {
                hasValue: false,
                value: ''
            } as INullable;
        }
        
    }
    public set(name: string, value: any) {
        if (isBrowser())
        localStorage.setItem(name, value);
    }
    public get(name: string) {
        if(isBrowser())
        return localStorage.getItem(name);
    }
    public exists(name: string): boolean {
        if(!isBrowser()){
            return false;
        }
        if (localStorage.getItem(name) === null) {
            return false;
        } else {
            return true;
        }
    }
    public remove(name: string) {
        // if(!isBrowser())
        localStorage.removeItem(name);
    }
    public existsCookie(name: string): boolean {
        if (this.readCookie(name) === null || this.readCookie(name) === undefined) {
            return false;
        } else {
            return true;
        }
    }

    public createCookie(name: string, value: string, days: number) {
        let expires = '';
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }
    // public static createClientOnlySessionCookie(name: string, value: string) {
    //     document.cookie = name + '=' + value + '; path=/';
    // }
    public static createClientOnlySessionCookie(name: string, value: string, expirytime?: any) {
        let secure = '';
        // if (!(window.location.hostname.indexOf('local') > -1)) {
        // secure = ';domain=' + window.location.hostname + 'secure';
        // }
        // 
        if (expirytime) {
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + (60 * 60 * 24 * 1000 * 7);
            now.setTime(expireTime);
            // 
            document.cookie = name + '=' + value + secure + '; path=/;expires=' + now.toUTCString() + ';';
        } else {
            document.cookie = name + '=' + value + secure + '; path=/';
        }

    }

    public readCookie(name: string) {
        let nameEQ = name + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    public eraseCookie(name: string) {
        document.cookie = name + '=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    }
}

export class Session {
    public static set(name: string, value: any) {
        sessionStorage.setItem(name, value);
    }
    public static get(name: string) {
        return sessionStorage.getItem(name);
    }
    public static exists(name: string): boolean {
        if (sessionStorage.getItem(name) === null) {
            return false;
        } else {
            return true;
        }
    }
    public static remove(name: string) {
        sessionStorage.removeItem(name);
    }
}
