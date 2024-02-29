import Base64 from 'crypto-js/enc-base64';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import sha256 from 'crypto-js/sha256';
import JSEncrypt from 'jsencrypt-node';
import { ED25519, hexToUArray, Signature } from './ed25519';

export interface IData
{
    key: IKey,
    data: IDt
}
export interface IKey {
    public: string,
    private: string
}

export interface IDt {
    PublicKey: string,
    Secret: string,
    Id: number
}

export class SignatureCreator 
{
    public constructor(private data: IData, private ed25519 = ED25519.getInstance()){
    }
    public generateSignature(requestUrl: string, requestType: string, requestBody: any): Signature {
        const body1: any = {};
        for (const key in requestBody) {
          if (!(new RegExp('picture|file|_|recaptcharesponse')).test(key.toLocaleLowerCase()) && requestBody[key] !== undefined) {
            body1[key] = requestBody[key] !== null ? requestBody[key].toString() : requestBody[key];
          }
        }

        const isGetRequest = requestType.toUpperCase() === 'GET'
        if (isGetRequest && Object.keys(requestBody).length > 0) {
            throw new Error('GET requests cannot have a body')
        }
        
        const body = isGetRequest ? '' : JSON.stringify(body1);
        const nonce: number = Date.now() + 0;
        const signature = Base64.stringify(sha256(this.getSecret() + requestUrl + requestType + body));
        const hashedSignature = hmacSHA512(signature + nonce, this.getSecret());
        if (!this.ed25519.privateKeyInited()) {
          this.ed25519.init(this.getPrivateKey());
        }
        return {
            key: this.ed25519.signUArray(hexToUArray(hashedSignature.toString())),
            nonce: nonce
        }
      }
    public getSecret() {
        return this.data.data.Secret;
    }
    public getPrivateKey() {
        return this.data.key.private;
    }
    public getPublicKey() {
        return this.data.key.public;
    }
    public getRSAPublicKey() {
        return this.data.data.PublicKey;
    }
    public async encryptObject(response: object): Promise<object> {
        const resp1 = Object.assign({}, response);
        return await this.iterateObject(resp1, '', (text: string) => {
            return this.encrypt(text);
        }, this.getPublicKey());
    }
    private async encrypt(text: string): Promise<string> {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.getRSAPublicKey());
        return encodeURIComponent(encrypt.encrypt(text));
    }
    
    private _regex = new RegExp('picture|file|_|recaptcharesponse|geetest_validate|geetest_challenge|geetest_seccode');

    private async iterateObject(obj: any, stack: any, func: any, key: any) {
        for (const property in obj) {
            if (this._regex.test(property.toString().toLocaleLowerCase())) {
                continue;
            }
            if (obj.hasOwnProperty(property)) {

                if (typeof obj[property] === 'object') {

                    await this.iterateObject(obj[property], stack + '.' + property, func, key);
                } else {
                    try {
                        if (!(new RegExp('picture|file|_|recaptcharesponse')).test(property)) {
                            obj[property] = await func(obj[property].toString(), key);
                        }

                    } catch (err) {
                        console.error('iterateObject', err)
                    }
                }
            }
        }
        return obj;
    }
}

export function ObjectToQueryParam( obj: any )
{
    if (obj === undefined) {
        return;
    }
    try {
        let str = Object.keys(obj).reduce(function(a: any, k){
            a.push(k + '=' + encodeURIComponent(obj[k]));
            return a;
        }, []).join('&');
        return str.length > 0 ? '?' + str : str;
        // let str = '?' + Object.keys(obj).reduce(function (a: any, k) {
        //     a.push(k + '=' + encodeURIComponent(obj[k]));
        //     return a;
        // }, []).join('&');
        // return str.length > 0 ? '?' + str : str;
    } catch (error) {

    }

}
// {
//     let str = '?' + Object.keys(obj).reduce(function(a: any, k){
//         a.push(k + '=' + encodeURIComponent(obj[k]));
//         return a;
//     }, []).join('&');
//     return str;
// }