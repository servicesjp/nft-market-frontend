import { getExchangeClient } from "@/modules/encrypted-exchange/encrypted-exchange-client";

export class SimplexApiCall {
  private client = getExchangeClient();
  private static instance: SimplexApiCall;
  
  private constructor() {
    if(SimplexApiCall.instance)
    {
        throw new Error("Error: Instantiation failed: Use SimplexApiCall.getInstance() instead of new.");
    }
  } 

  public static getInstance()
  {
      if (SimplexApiCall.instance == null)
      {
        SimplexApiCall.instance = new SimplexApiCall();
      }
      return this.instance;
  }

  public async saveQuote(quoteId: string, digitalCr: string,digitAmount: string,fiatBaseAmnt:string, fiatCr: string,fiatAmount: string) {
    
    let body = { QuoteID:quoteId,DigitCr:digitalCr,DigitalAmount:digitAmount,
      FiatCr: fiatCr,FiatBaseAmount:fiatBaseAmnt,FiatTotalAmount: fiatAmount};

      // return await this.apiCall.postAuth('simplex/save-quoteresp', body)
    return await this.client.post('/simplex/save-quoteresp', body, {useToken: true, encodeBody: false})
  }

  public async createTransaction(quoteId: string) {
    // resp = await this.apiCall.postAuth('Simplex/payment-request', { QuoteId: quoteId })
    return await this.client.post('/simplex/payment-request', { QuoteId: quoteId }, {useToken: true, encodeBody: false})
    
  
  }
  public async userInfo() {
    let resp;
    // resp = await ApiCall.getInstance().getAuthData('accountsettings/account-info', {}, false)
    resp = await this.client.get('/accountsettings/account-info', {useToken: true})
    return resp.data.Em;
  }

}
