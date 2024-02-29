import axios from 'axios';
import FormDataContainer from 'form-data';
import ItemType from '../types/ItemType';
import { ProductSortType } from '@/types/ProductSortType';
import { ApiConfig, Api as BaseApi } from './BaseApi';

export default class Api extends BaseApi<any> {
  private static _instance: Api;
  private static _token: string;

  private static getConfig(): ApiConfig<any> {
    const config = {
      baseURL: this.ApiUrl,
      headers: {
        'x-access-token': this._token
      },
    };
    console.log({ config });
    return config;
  }

  public static get instance(): Api {
    if (!this._instance) {
      this._instance = new Api(this.getConfig());
    }
    return this._instance;
  }

  public static get ApiUrl() {
    const url = process.env.REACT_APP_API_URL;
    const port = process.env.REACT_APP_API_PORT;
    return `${url}${port ? `:${port}` : ''}`;
  }

  public static setToken(accessToken: string) {
    this._token = accessToken;
    this._instance = new Api(this.getConfig());
    return this;
  }

  public static async isLogged(accessToken?: string) {
    if (accessToken) this.setToken(accessToken);
    return this.instance.users
      .userControllerFindMe()
      .then(() => true)
      .catch(() => false);
  }

  public static async getUserNotifications(
    from: Date,
    to: Date,
    offset: number = 0,
    limit: number = 0,
  ) {
    return (
      await this.instance.users.userControllerGetMyNotifications({
        from,
        to,
        offset,
        limit,
      })
    ).data;
  }

  public static async getUserTransactionsActivity(
    from: Date,
    to: Date,
    offset: number = 0,
    limit: number = 0,
  ) {
    return (
      await this.instance.users.userControllerGetMyTransactionActivity({
        from,
        to,
        offset,
        limit,
      })
    ).data;
  }

  public static async getUserAccessActivity(
    from: Date,
    to: Date,
    offset: number = 0,
    limit: number = 0,
  ) {
    return (
      await this.instance.users.userControllerGetMyAccessActivity({
        from,
        to,
        offset,
        limit,
      })
    ).data;
  }

  public static async oauthAuthenticate(cognitoJwt: string) {
    return this.instance.auth.authControllerOauth({
      headers: { 'cognito-key': cognitoJwt },
    });
  }
  public static async registerTerms() {
    return this.instance.auth.authControllerConfirmTerms();
  }
  public static async registerConfirm(
    phoneNumber: string,
    username: string,
    email: string,
  ) {
    return this.instance.auth.authControllerConfirmSignup({
      phoneNumber,
      username,
      email,
    });
  }
  public static async registerDetails(
    cognitoJwt: string,
    email: string,
    phoneNumber: string,
  ) {
    return this.instance.auth.authControllerSignup({
      body: { email, phoneNumber },
      headers: { 'cognito-key': cognitoJwt },
    } as any);
  }

  public static async getOrganizations() {
    return this.instance.organizations.organizationControllerList();
  }
  public static async getPublicOrganizations(query = {}) {
    return this.instance.organizations.organizationControllerPublicList(query);
  }
  public static async getMyOrganizationProfile() {
    return this.instance.organizations.organizationControllerGetMyProfile();
  }
  public static async getPublicOrganization(id: string) {
    return this.instance.organizations.organizationControllerGetPublicProfile(
      id,
    );
  }
  public static async getUser() {
    return this.instance.users.userControllerFindMe();
  }

  public static async getMyMerchantRequests() {
    return (await this.instance.users.userControllerMyMerchantRequests()).data;
  }

  public static async requestToBeMerchant(
    reason: string,
    businessDescription: string,
  ) {
    return this.instance.users.userControllerRequestMerchant({
      reason,
      businessDescription,
    });
  }

  public static async updateProfile(params: any, profilePicture?: Blob) {
    let formData = new FormDataContainer();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));
    if (profilePicture) formData.append('file', profilePicture);
    console.log({ formData });
    const response = await axios.post(`${this.ApiUrl}/users/me`, formData, {
      headers: { 'x-access-token': this._token },
    });
    return response.data;
  }

  public static async getCurrencies() {
    return (await this.instance.currency.currencyControllerFind()).data;
  }

  public static async getProductActivity(id: string) {
    return (await this.instance.product.productControllerGetActivity(id)).data;
  }

  public static async getBidsStats(id: string) {
    return (await this.instance.product.productControllerBidStats(id)).data;
  }

  public static async getOfferStats(id: string) {
    return (await this.instance.product.productControllerOfferStats(id)).data;
  }

  public static async getProductOffers(id: string) {
    return (await this.instance.product.productControllerOffers(id)).data;
  }

  public static async updateMerchantProfile(content: string) {
    return (
      await this.instance.organizations.organizationControllerUpdateProfile({
        content,
      })
    ).data;
  }

  public static async acceptOffer(offerId: string, transactionHash: string) {
    return (
      await this.instance.offer.offerControllerAcceptOffer(offerId, {
        transactionHash,
      })
    ).data;
  }

  public static async getProductMedia(id: string) {
    return (await this.instance.product.productControllerViewMedia(id)).data;
  }

  public static async getMyProduct(id: string) {
    return (await this.instance.product.productControllerMyProduct(id)).data;
  }

  public static async getProductInstancePublic(id: string, instanceId: string) {
    return (
      await this.instance.product.productControllerGetOneInstancePublic(
        id,
        instanceId,
      )
    ).data;
  }

  public static async getProductInstance(id: string, instanceId: string) {
    return (
      await this.instance.product.productControllerGetOneInstance(
        id,
        instanceId,
      )
    ).data;
  }

  public static async getProduct(id: string) {
    return (await this.instance.product.productControllerGetOne(id)).data;
  }

  public static async listProduct(productId: string, price: number) {
    return this.instance.product.productControllerList(productId, { price });
  }

  public static async validatePurchaseProduct(
    productId: string,
    productInstanceId: string,
  ) {
    return this.instance.product.productControllerBuyValidation(
      productId,
      productInstanceId,
    );
  }

  public static async purchaseProduct(
    productId: string,
    productInstanceId: string,
    transactionHash: string,
  ) {
    return this.instance.product.productControllerBuy(
      productId,
      productInstanceId,
      { transactionHash },
    );
  }

  public static async myBids() {
    return (await this.instance.bids.bidControllerMine()).data;
  }

  public static async placeBid(
    auctionId: string,
    price: number,
    transactionHash: string,
  ) {
    return (
      await this.instance.auction.auctionControllerPlaceBid(auctionId, {
        price,
        transactionHash,
      })
    ).data;
  }

  public static async makeOffer(
    productId: string,
    productInstanceId: string,
    currency: string,
    price: number,
    transactionHash: string,
  ) {
    return (
      await this.instance.product.productControllerMakeOffer(
        productId,
        productInstanceId,
        { currencyType: currency, price, transactionHash },
      )
    ).data;
  }

  public static async getPurchasePrices(id: string) {
    return (
      await this.instance.purchase.purchaseControllerPurchaseGainHistory(id)
    ).data;
  }

  public static async getStats() {
    return (await this.instance.stats.statsControllerFind()).data;
  }

  public static async getProductPrices(id: string, days: number = 30) {
    return (
      await this.instance.product.productControllerGetPriceHistory(id, { days })
    ).data;
  }

  public static async searchProduct({
    search,
    flags = [],
    sortType = ProductSortType.RecentlyCreated,
    itemType = ItemType.SingleItem,
    chains = ['All'],
    currency = [],
    minPrice,
    maxPrice,
    limit = 10,
    groups = [],
    offset = 0,
  }: {
    search?: string;
    flags?: string[];
    sortType?: ProductSortType;
    itemType?: ItemType;
    chains?: any[];
    currency?: any[];
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    groups?: string[];
    offset?: number;
  }) {
    const currencyType = currency.length ? currency : undefined;
    return (
      await this.instance.products.productsControllerFind({
        q: search,
        f: flags,
        s: sortType,
        chains,
        min_price: minPrice,
        max_price: maxPrice,
        currencyType,
        l: limit,
        groups,
        o: offset,
        itemType,
      })
    ).data;
  }

  public static async myProducts(
    canListOnly: boolean = false,
    query?: string,
    itemType?: any,
    sortType?: any,
  ) {
    return (
      await this.instance.products.productsControllerMyProducts({
        canListOnly,
        q: query,
        s: sortType,
        itemType: itemType,
      })
    ).data;
  }

  public static async myLikedProducts(
    query: string,
    itemType: any,
    sortType: any,
  ) {
    return (
      await this.instance.products.productsControllerMyLikedProducts({
        q: query,
        s: sortType,
        itemType: itemType,
      })
    ).data;
  }

  public static async myOffersMade() {
    return (await this.instance.offer.offerControllerMine()).data;
  }

  public static async myPurchase() {
    return (await this.instance.purchase.purchaseControllerFind()).data;
  }

  public static async createAuction(
    productId: string,
    transactionHash: string,
    startDate: Date,
    duration: number,
  ) {
    return (
      await this.instance.product.productControllerCreateAuction(productId, {
        transactionHash,
        startDate,
        duration,
      })
    ).data;
  }

  public static async randomProducts() {
    return (await this.instance.products.productsControllerRandom()).data;
  }

  public static async updateProduct(id: string, product: any) {
    return (await this.instance.product.productControllerUpdateOne(id, product))
      .data;
  }

  public static async createProduct(
    params: any,
    image?: Blob,
    gallery?: Blob[],
  ) {
    let formData = new FormDataContainer();
    Object.keys(params).forEach((key) => formData.append(key, params[key]));
    if (image) formData.append('image', image);
    if (gallery) gallery.forEach((g) => formData.append('gallery', g));
    const response = await axios.post(`${this.ApiUrl}/product`, formData, {
      headers: { 'x-access-token': this._token },
    });
    return response.data;
  }

  public static async follow(organizationId: string) {
    return (
      await this.instance.organizations.organizationControllerPostFollow(
        organizationId,
      )
    ).data;
  }

  public static async unfollow(organizationId: string) {
    return (
      await this.instance.organizations.organizationControllerDeleteFollow(
        organizationId,
      )
    ).data;
  }

  public static async createLike(productId: string) {
    return (await this.instance.product.productControllerPostLike(productId))
      .data;
  }

  public static async removeLike(productId: string) {
    return (await this.instance.product.productControllerDeleteLike(productId))
      .data;
  }

  public static async getLangTranslations(langCode: string) {
    return (
      await this.instance.localization.localizationControllerGetLangTranslations(
        langCode,
      )
    ).data;
  }

  public static async getAllTranslations() {
    return (
      await this.instance.localization.localizationControllerGetAllTranslations()
    ).data;
  }

  public static async registerOwnDevice(deviceId: string) {
    return (
      await this.instance.device.userDeviceControllerRegister({ deviceId })
    )?.data;
  }
}
