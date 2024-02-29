import atob from 'atob';
import * as tweetnacl from 'tweetnacl';

export interface Signature {
    key: string;
    nonce: number;
  }
  
  interface IKeyPair {
    public: string,
    private: string
  }
  declare var JSEncrypt: any;
  
  interface IInfo {
    PublicKey?: string,
    PrivateKey?: string,
    Secret?: string,
    Id?: string
  }
  
export class ED25519 {
    private static instance: ED25519;
    private privateKey?: Uint8Array;
    public static getInstance(): ED25519 {
      if (ED25519.instance == null) {
        ED25519.instance = new ED25519();
      }
      return ED25519.instance;
    }
    private constructor() {
    }
    public init(_privateKey: string) {
      this.privateKey = base64ToUArray(_privateKey);
    }
    public generateKey(): IKeyPair {
      let key = tweetnacl.sign.keyPair();
      return {
        public: UArrayToBase64(key.publicKey),
        private: UArrayToBase64(key.secretKey)
      } as IKeyPair;
    }
    public sign(msg: string): string {
      if (isNullOrUndefined(this.privateKey))
        throw new Error("PrivateKey not defined");
        console.log('this.privateKey', this.privateKey)
      return UArrayToBase64(tweetnacl.sign(strToUArray(msg), this.privateKey as any))
    }
    public signUArray(msg: Uint8Array): string {
      if (isNullOrUndefined(this.privateKey))
        throw new Error("PrivateKey not defined");
      return UArrayToBase64(tweetnacl.sign(msg, this.privateKey as any))
    }
    public privateKeyInited(): boolean {
      return !isNullOrUndefined(this.privateKey);
    }
}
export function UArrayToBase64(buf: Uint8Array) {
    return btoa(String.fromCharCode.apply(null, Array.from(buf)));
  }
  
  export function base64ToUArray(str: string): Uint8Array {
    var binary_string = atob(str);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
  
  export function strToUArray(str: string): Uint8Array {
    return Uint8Array.from(str, x => x.charCodeAt(0))
  }
  
  export function hexToBytes(hex: string) {
    for (var bytes: any[] = [], c = 0; c < hex.length; c += 2)
    {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
  }
  
  export function hexToUArray(hex: string): Uint8Array {
    return Uint8Array.from(hexToBytes(hex));
  }
  
  
  
export function isNullOrUndefined(value: any) {
    return (value ?? null) === null;
  }
  