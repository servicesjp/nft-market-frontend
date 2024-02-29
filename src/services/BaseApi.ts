/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Transaction {
  /** @minLength 1 */
  transactionHash: string;
}

export interface Offer {
  /** @minLength 1 */
  buyer: string;
  /** @minLength 1 */
  seller: string;
  /** @minLength 1 */
  product: string;
}

export interface Purchase {
  /** @minLength 1 */
  buyer: string;
  /** @minLength 1 */
  seller: string;
  /** @minLength 1 */
  product: string;
}

export interface Playlist {
  /** @minLength 1 */
  name: string;
}

export interface PlaylistEntry {
  /** @minLength 1 */
  product: string;
  /** @minLength 1 */
  playlist: string;
  /** @minLength 1 */
  mediaId: string;
  /** @minLength 1 */
  mediaType: string;
}

export interface AuctionBid {
  /** @minLength 1 */
  user: string;
  /** @minLength 1 */
  auction: string;
}

export interface Auction {
  /** @minLength 1 */
  user: string;
  /** @minLength 1 */
  organization: string;
  /** @minLength 1 */
  product: string;
}

export interface User {
  /** @minLength 1 */
  username: string;
}

export interface ListResult {
  items: any[];
  count: number;
  offset: number;
  limit: number;
}

export interface UserResponse {
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  bio: string;
  /** @minLength 1 */
  publicAddress: string;
  /** @format uuid */
  id: string;
  /** @minLength 1 */
  nonce: string;
}

export interface UserListResponse {
  count: number;
  userList: any[];
}

export interface BaseUser {
  /** @minLength 1 */
  publicAddress: string;
}

export interface ProductBase {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  categories: string;
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  description: string;
  /** @minLength 1 */
  price: string;
  /** @minLength 1 */
  owner: string;
  mediaAssets: any[];
  createdAt: string;
  updatedAt: string;
  /** @minLength 1 */
  auctions: string;
  /** @minLength 1 */
  likesCount: string;
  /** @minLength 1 */
  visitsCount: string;
  /** @minLength 1 */
  userLike: string;
  /** @minLength 1 */
  sold: string;
  approve: boolean;
  moderator: any;
  /** @minLength 1 */
  sellType: string;
  /** @minLength 1 */
  approvalStatus: string;
}

export interface Auth {
  accessToken?: any;
  error?: any;
  finishedRegistration?: any;
  launchpadSession?: any;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: process.env.NEXT_PUBLIC_NFT_BACKEND_BASE_URL });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title MeteorNFT
 * @version 0.0.1
 * @baseUrl http://0.0.0.0:8080/api
 *
 * Tsurugi Project - Market - Backend
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  roles = {
    /**
     * No description
     *
     * @tags User Roles
     * @name UserRolesControllerList
     * @summary List
     * @request GET:/roles
     */
    userRolesControllerList: (params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/roles`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  device = {
    /**
     * No description
     *
     * @tags User Device
     * @name UserDeviceControllerRegister
     * @summary Register
     * @request POST:/device
     */
    userDeviceControllerRegister: (
      data: {
        deviceId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/device`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags User
     * @name UserControllerFind
     * @summary Find
     * @request GET:/users
     */
    userControllerFind: (
      query?: {
        meteorUserId?: string;
        publicAddress?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserResponse, any>({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerCreate
     * @summary Create
     * @request POST:/users
     */
    userControllerCreate: (data?: any, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerFindMe
     * @summary Find me
     * @request GET:/users/me
     */
    userControllerFindMe: (params: RequestParams = {}) =>
      this.request<ListResult, any>({
        path: `/users/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdateMyProfile
     * @summary Update my profile
     * @request POST:/users/me
     */
    userControllerUpdateMyProfile: (data?: any, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/users/me`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetAllUserNotifications
     * @summary Get all user notifications
     * @request GET:/users/admin/notifications
     */
    userControllerGetAllUserNotifications: (
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/admin/notifications`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMerchants
     * @summary Get merchants
     * @request GET:/users/merchants
     */
    userControllerGetMerchants: (
      data: {
        approvalStatus?: string;
        offset?: any;
        limit?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/merchants`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMyNotifications
     * @summary Get my notifications
     * @request GET:/users/me/notifications
     */
    userControllerGetMyNotifications: (
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/users/me/notifications`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetUserNotifications
     * @summary Get user notifications
     * @request GET:/users/{id}/notifications
     */
    userControllerGetUserNotifications: (
      id: string,
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/${id}/notifications`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetAllTransactionActivity
     * @summary Get all transaction activity
     * @request GET:/users/admin/activity/transactions
     */
    userControllerGetAllTransactionActivity: (
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/admin/activity/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMyTransactionActivity
     * @summary Get my transaction activity
     * @request GET:/users/me/activity/transactions
     */
    userControllerGetMyTransactionActivity: (
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/me/activity/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetUserTransactionActivity
     * @summary Get user transaction activity
     * @request GET:/users/{id}/activity/transactions
     */
    userControllerGetUserTransactionActivity: (
      id: string,
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/${id}/activity/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMyAccessActivity
     * @summary Get my access activity
     * @request GET:/users/me/activity/access
     */
    userControllerGetMyAccessActivity: (
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/me/activity/access`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetUserAccessActivity
     * @summary Get user access activity
     * @request GET:/users/{id}/activity/access
     */
    userControllerGetUserAccessActivity: (
      id: string,
      query?: {
        from?: any;
        to?: any;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/${id}/activity/access`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerRawCreate
     * @summary Raw create
     * @request POST:/users/rawCreate
     */
    userControllerRawCreate: (
      data: {
        user?: User;
        roles?: any[];
      },
      params: RequestParams = {},
    ) =>
      this.request<UserResponse, any>({
        path: `/users/rawCreate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdatePassword
     * @summary Update password
     * @request POST:/users/{id}/password
     */
    userControllerUpdatePassword: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/users/${id}/password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdateProfile
     * @summary Update profile
     * @request POST:/users/{id}
     */
    userControllerUpdateProfile: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/users/${id}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetOne
     * @summary Get one
     * @request GET:/users/{id}
     */
    userControllerGetOne: (id: string, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerDelete
     * @summary Delete
     * @request DELETE:/users/{id}
     */
    userControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetAll
     * @summary Get all
     * @request GET:/users/all
     */
    userControllerGetAll: (
      query?: {
        offset?: any;
        limit?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserListResponse, any>({
        path: `/users/all`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetAll2
     * @summary Get all 2
     * @request GET:/users/all2
     */
    userControllerGetAll2: (
      query?: {
        offset?: any;
        limit?: any;
        q?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserListResponse, any>({
        path: `/users/all2`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetOnePublic
     * @summary Get one public
     * @request GET:/users/{id}/public
     */
    userControllerGetOnePublic: (id: string, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/users/${id}/public`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdateRoles
     * @summary Update roles
     * @request POST:/users/{id}/roles
     */
    userControllerUpdateRoles: (
      id: string,
      data: {
        roleids?: object[];
      },
      params: RequestParams = {},
    ) =>
      this.request<UserResponse, any>({
        path: `/users/${id}/roles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerMyMerchantRequests
     * @summary My merchant requests
     * @request POST:/users/merchant/request/mine
     */
    userControllerMyMerchantRequests: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/merchant/request/mine`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerRequestMerchant
     * @summary Request merchant
     * @request POST:/users/merchant/request
     */
    userControllerRequestMerchant: (data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/merchant/request`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerApproveMerchant
     * @summary Approve merchant
     * @request POST:/users/merchant/approve
     */
    userControllerApproveMerchant: (
      data: {
        requsrid?: string;
        result?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/users/merchant/approve`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetMerchantRequests
     * @summary Get merchant requests
     * @request GET:/users/merchant/requests
     */
    userControllerGetMerchantRequests: (
      data: {
        approvalStatus?: string;
        offset?: any;
        limit?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/users/merchant/requests`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  system = {
    /**
     * No description
     *
     * @tags System
     * @name SystemControllerHealth
     * @summary Health
     * @request GET:/system/health
     */
    systemControllerHealth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/system/health`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SystemControllerCreateAdmin
     * @summary Create admin
     * @request POST:/system/createAdmin
     */
    systemControllerCreateAdmin: (
      data: {
        credentials?: any;
        apiKey?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/system/createAdmin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SystemControllerResetAdmin
     * @summary Reset admin
     * @request GET:/system/resetAdmin
     */
    systemControllerResetAdmin: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/system/resetAdmin`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SystemControllerSetConfig
     * @summary Set config
     * @request POST:/system/config
     */
    systemControllerSetConfig: (
      data: {
        values?: object[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/system/config`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SystemControllerGetAllConfigKeys
     * @summary Get all config keys
     * @request GET:/system/config
     */
    systemControllerGetAllConfigKeys: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/system/config`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SystemControllerGetConfigKey
     * @summary Get config key
     * @request GET:/system/config/{key}
     */
    systemControllerGetConfigKey: (key: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/system/config/${key}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SystemControllerDeleteConfigKey
     * @summary Delete config key
     * @request DELETE:/system/config/{key}
     */
    systemControllerDeleteConfigKey: (key: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/system/config/${key}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SystemControllerReloadContracts
     * @summary Reload contracts
     * @request GET:/system/contracts/reload
     */
    systemControllerReloadContracts: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/system/contracts/reload`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  stats = {
    /**
     * No description
     *
     * @tags Stats
     * @name StatsControllerFind
     * @summary Find
     * @request GET:/stats
     */
    statsControllerFind: (params: RequestParams = {}) =>
      this.request<ListResult, any>({
        path: `/stats`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stats
     * @name StatsControllerStatsEscrowByDay
     * @summary Stats escrow by day
     * @request GET:/stats/admin/escrow-by-day
     */
    statsControllerStatsEscrowByDay: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stats/admin/escrow-by-day`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stats
     * @name StatsControllerStatsAllTime
     * @summary Stats all time
     * @request GET:/stats/admin/all-time
     */
    statsControllerStatsAllTime: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stats/admin/all-time`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stats
     * @name StatsControllerStatsSummary
     * @summary Stats summary
     * @request GET:/stats/admin/summary
     */
    statsControllerStatsSummary: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stats/admin/summary`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  purchases = {
    /**
     * No description
     *
     * @tags Purchases
     * @name PurchasesControllerGet
     * @summary Get
     * @request GET:/purchases
     */
    purchasesControllerGet: (
      query?: {
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/purchases`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  purchase = {
    /**
     * No description
     *
     * @tags Purchase
     * @name PurchaseControllerFind
     * @summary Find
     * @request GET:/purchase
     */
    purchaseControllerFind: (params: RequestParams = {}) =>
      this.request<Purchase[], any>({
        path: `/purchase`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchaseControllerPurchaseGainHistory
     * @summary Purchase gain history
     * @request GET:/purchase/{id}/prices
     */
    purchaseControllerPurchaseGainHistory: (id: string, params: RequestParams = {}) =>
      this.request<Purchase[], any>({
        path: `/purchase/${id}/prices`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchaseControllerUnapproved
     * @summary Unapproved
     * @request GET:/purchase/unapproved
     */
    purchaseControllerUnapproved: (params: RequestParams = {}) =>
      this.request<Purchase[], any>({
        path: `/purchase/unapproved`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchaseControllerGetOne
     * @summary Get one
     * @request GET:/purchase/{id}/info
     */
    purchaseControllerGetOne: (id: string, params: RequestParams = {}) =>
      this.request<Purchase, any>({
        path: `/purchase/${id}/info`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchaseControllerUpdate
     * @summary Update
     * @request POST:/purchase/{id}/approve
     */
    purchaseControllerUpdate: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/purchase/${id}/approve`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchaseControllerConfirmPurchase
     * @summary Confirm purchase
     * @request POST:/purchase/{id}/confirm
     */
    purchaseControllerConfirmPurchase: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/purchase/${id}/confirm`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  products = {
    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerFind
     * @summary Find
     * @request GET:/products
     */
    productsControllerFind: (
      query?: {
        q?: string;
        f?: any[];
        s?: number;
        l?: any;
        o?: any;
        as?: string;
        chains?: object[];
        min_price?: number;
        max_price?: number;
        groups?: any[];
        currencyType?: object[];
        itemType?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerRandom
     * @summary Random
     * @request GET:/products/rand
     */
    productsControllerRandom: (params: RequestParams = {}) =>
      this.request<ProductBase[], any>({
        path: `/products/rand`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerUnapproved
     * @summary Unapproved
     * @request GET:/products/unapproved
     */
    productsControllerUnapproved: (params: RequestParams = {}) =>
      this.request<ListResult, any>({
        path: `/products/unapproved`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerMyLikedProducts
     * @summary My liked products
     * @request GET:/products/liked
     */
    productsControllerMyLikedProducts: (
      query?: {
        itemType?: number;
        s?: number;
        q?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductBase[], any>({
        path: `/products/liked`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerMyProducts
     * @summary My products
     * @request GET:/products/mine
     */
    productsControllerMyProducts: (
      query?: {
        canListOnly?: boolean;
        itemType?: number;
        s?: number;
        onSell?: boolean;
        q?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductBase[], any>({
        path: `/products/mine`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerCreateFakeProduct
     * @summary Create fake product
     * @request POST:/products/fake-product
     */
    productsControllerCreateFakeProduct: (data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/fake-product`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerCreateFromGForms
     * @summary Create from g forms
     * @request POST:/products/gform
     */
    productsControllerCreateFromGForms: (data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/gform`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerCreateFromCsv
     * @summary Create from csv
     * @request POST:/products/csv
     */
    productsControllerCreateFromCsv: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/products/csv`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsControllerGetGroups
     * @summary Get groups
     * @request GET:/products/groups
     */
    productsControllerGetGroups: (params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/products/groups`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  product = {
    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerAdminPublicCreate
     * @summary Admin public create
     * @request POST:/product/public-create
     */
    productControllerAdminPublicCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/public-create`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerCreate
     * @summary Create
     * @request POST:/product/
     */
    productControllerCreate: (data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerRegenerateLazyMint
     * @summary Regenerate lazy mint
     * @request POST:/product/{id}/lazy-mint
     */
    productControllerRegenerateLazyMint: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase[], any>({
        path: `/product/${id}/lazy-mint`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerUpdateOne
     * @summary Update one
     * @request PATCH:/product/{id}
     */
    productControllerUpdateOne: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerGetNftMetadata
     * @summary Get nft metadata
     * @request GET:/product/{id}/token
     */
    productControllerGetNftMetadata: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/token`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerMyProduct
     * @summary My product
     * @request GET:/product/mine/{id}
     */
    productControllerMyProduct: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/mine/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerGetOne
     * @summary Get one
     * @request GET:/product/{id}/info
     */
    productControllerGetOne: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/info`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerGetUserProducts
     * @summary Get user products
     * @request GET:/product/user-products/{address}/
     */
    productControllerGetUserProducts: (address: string, params: RequestParams = {}) =>
      this.request<ProductBase[], any>({
        path: `/product/user-products/${address}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerViewMedia
     * @summary View media
     * @request GET:/product/{id}/media
     */
    productControllerViewMedia: (id: string, params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/product/${id}/media`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerGetOneInstancePublic
     * @summary Get one instance public
     * @request GET:/product/{id}/info/{instanceId}/public
     */
    productControllerGetOneInstancePublic: (id: string, instanceId: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/info/${instanceId}/public`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerGetOneInstance
     * @summary Get one instance
     * @request GET:/product/{id}/info/{instanceId}
     */
    productControllerGetOneInstance: (id: string, instanceId: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/info/${instanceId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerGetActivity
     * @summary Get activity
     * @request GET:/product/{id}/activity
     */
    productControllerGetActivity: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/activity`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerGetPriceHistory
     * @summary Get price history
     * @request GET:/product/{id}/prices
     */
    productControllerGetPriceHistory: (
      id: string,
      query?: {
        days?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/prices`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerBidStats
     * @summary Bid stats
     * @request GET:/product/{id}/bid-stats
     */
    productControllerBidStats: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/bid-stats`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerOffers
     * @summary Offers
     * @request GET:/product/{id}/offer
     */
    productControllerOffers: (id: string, params: RequestParams = {}) =>
      this.request<Offer, any>({
        path: `/product/${id}/offer`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerOfferStats
     * @summary Offer stats
     * @request GET:/product/{id}/offer-stats
     */
    productControllerOfferStats: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/offer-stats`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerPostLike
     * @summary Post like
     * @request POST:/product/{id}/like
     */
    productControllerPostLike: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/like`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerDeleteLike
     * @summary Delete like
     * @request DELETE:/product/{id}/like
     */
    productControllerDeleteLike: (id: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/like`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerCancelListing
     * @summary Cancel listing
     * @request DELETE:/product/{id}/cancel
     */
    productControllerCancelListing: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/cancel`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerUpdateApprovalStatus
     * @summary Update approval status
     * @request POST:/product/{id}/approve
     */
    productControllerUpdateApprovalStatus: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/product/${id}/approve`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerList
     * @summary List
     * @request POST:/product/{id}/list
     */
    productControllerList: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/list`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerBuyValidation
     * @summary Buy validation
     * @request POST:/product/{id}/buy/{instanceId}/validate
     */
    productControllerBuyValidation: (id: string, instanceId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/buy/${instanceId}/validate`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerBuy
     * @summary Buy
     * @request POST:/product/{id}/buy/{instanceId}
     */
    productControllerBuy: (id: string, instanceId: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/buy/${instanceId}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerCreateAuction
     * @summary Create auction
     * @request POST:/product/{id}/auction
     */
    productControllerCreateAuction: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/auction`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerMakeOffer
     * @summary Make offer
     * @request POST:/product/{id}/{instanceId}/offer
     */
    productControllerMakeOffer: (id: string, instanceId: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/${instanceId}/offer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerSetGroups
     * @summary Set groups
     * @request POST:/product/{id}/groups
     */
    productControllerSetGroups: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/groups`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Product
     * @name ProductControllerSetOrganization
     * @summary Set organization
     * @request POST:/product/{id}/organization
     */
    productControllerSetOrganization: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/product/${id}/organization`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  playlist = {
    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerCreate
     * @summary Create
     * @request POST:/playlist
     */
    playlistControllerCreate: (data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerFind
     * @summary Find
     * @request GET:/playlist
     */
    playlistControllerFind: (
      query?: {
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/playlist`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerCreateEntry
     * @summary Create entry
     * @request POST:/playlist/{id}/entry
     */
    playlistControllerCreateEntry: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist/${id}/entry`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerSearch
     * @summary Search
     * @request GET:/playlist/search
     */
    playlistControllerSearch: (
      query?: {
        q?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/playlist/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerRecommended
     * @summary Recommended
     * @request GET:/playlist/recommended
     */
    playlistControllerRecommended: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist/recommended`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerUpdateOne
     * @summary Update one
     * @request PATCH:/playlist/{id}
     */
    playlistControllerUpdateOne: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerFindOne
     * @summary Find one
     * @request GET:/playlist/{id}
     */
    playlistControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerDeleteOne
     * @summary Delete one
     * @request DELETE:/playlist/{id}
     */
    playlistControllerDeleteOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerFindOneEntry
     * @summary Find one entry
     * @request GET:/playlist/{id}/entry/{entryId}
     */
    playlistControllerFindOneEntry: (id: string, entryId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist/${id}/entry/${entryId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Playlist
     * @name PlaylistControllerDeleteOneEntry
     * @summary Delete one entry
     * @request DELETE:/playlist/{id}/entry/{entryId}
     */
    playlistControllerDeleteOneEntry: (id: string, entryId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/playlist/${id}/entry/${entryId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  organizations = {
    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerList
     * @summary List
     * @request GET:/organizations
     */
    organizationControllerList: (
      query?: {
        name?: string;
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/organizations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerUpdateOrCreate
     * @summary Update or create
     * @request POST:/organizations
     */
    organizationControllerUpdateOrCreate: (data?: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetEscrow
     * @summary Get escrow
     * @request GET:/organizations/{id}/escrow/{chain}
     */
    organizationControllerGetEscrow: (id: string, chain: string, params: RequestParams = {}) =>
      this.request<ListResult, any>({
        path: `/organizations/${id}/escrow/${chain}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerPublicList
     * @summary Public list
     * @request GET:/organizations/public
     */
    organizationControllerPublicList: (
      query?: {
        name?: string;
        limit?: any;
        offset?: any;
        withProducts?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/organizations/public`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerUpdateSelf
     * @summary Update self
     * @request PATCH:/organizations/self
     */
    organizationControllerUpdateSelf: (data?: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations/self`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerUpdateProfile
     * @summary Update profile
     * @request POST:/organizations/profile
     */
    organizationControllerUpdateProfile: (data?: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations/profile`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetMyProfile
     * @summary Get my profile
     * @request GET:/organizations/profile
     */
    organizationControllerGetMyProfile: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations/profile`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetOrganization
     * @summary Get organization
     * @request GET:/organizations/{id}
     */
    organizationControllerGetOrganization: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerDelete
     * @summary Delete
     * @request DELETE:/organizations/{id}
     */
    organizationControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/organizations/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetOrganizationUsers
     * @summary Get organization users
     * @request GET:/organizations/{id}/user
     */
    organizationControllerGetOrganizationUsers: (
      id: string,
      query?: {
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/organizations/${id}/user`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetOrganizationSellingProducts
     * @summary Get organization selling products
     * @request GET:/organizations/{id}/selling
     */
    organizationControllerGetOrganizationSellingProducts: (
      id: string,
      query?: {
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/organizations/${id}/selling`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetOrganizationProducts
     * @summary Get organization products
     * @request GET:/organizations/{id}/product
     */
    organizationControllerGetOrganizationProducts: (
      id: string,
      query?: {
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/organizations/${id}/product`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetOrganizationNotifications
     * @summary Get organization notifications
     * @request GET:/organizations/{id}/notification
     */
    organizationControllerGetOrganizationNotifications: (
      id: string,
      query?: {
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/organizations/${id}/notification`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetOrganizationPurchases
     * @summary Get organization purchases
     * @request GET:/organizations/{id}/purchase
     */
    organizationControllerGetOrganizationPurchases: (
      id: string,
      query?: {
        limit?: any;
        offset?: any;
        released?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/organizations/${id}/purchase`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerGetPublicProfile
     * @summary Get public profile
     * @request GET:/organizations/{id}/public
     */
    organizationControllerGetPublicProfile: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations/${id}/public`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerPostFollow
     * @summary Post follow
     * @request POST:/organizations/{id}/follow
     */
    organizationControllerPostFollow: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations/${id}/follow`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerDeleteFollow
     * @summary Delete follow
     * @request DELETE:/organizations/{id}/follow
     */
    organizationControllerDeleteFollow: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/organizations/${id}/follow`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization
     * @name OrganizationControllerSetProducts
     * @summary Set products
     * @request POST:/organizations/{id}/products
     */
    organizationControllerSetProducts: (
      id: string,
      data: {
        ids?: object[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/organizations/${id}/products`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  offer = {
    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerFind
     * @summary Find
     * @request GET:/offer
     */
    offerControllerFind: (
      query?: {
        offset?: number;
        limit?: number;
        filters?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/offer`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerMine
     * @summary Mine
     * @request GET:/offer/mine
     */
    offerControllerMine: (
      query?: {
        offset?: number;
        limit?: number;
        filters?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/offer/mine`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerUnapproved
     * @summary Unapproved
     * @request GET:/offer/unapproved
     */
    offerControllerUnapproved: (
      query?: {
        name?: string;
        limit?: number;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/offer/unapproved`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerGetProductOffers
     * @summary Get product offers
     * @request GET:/offer/product/{productId}/
     */
    offerControllerGetProductOffers: (productId: string, params: RequestParams = {}) =>
      this.request<Offer[], any>({
        path: `/offer/product/${productId}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerGetOne
     * @summary Get one
     * @request GET:/offer/{id}/info
     */
    offerControllerGetOne: (id: string, params: RequestParams = {}) =>
      this.request<Offer, any>({
        path: `/offer/${id}/info`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerAcceptOffer
     * @summary Accept offer
     * @request POST:/offer/{id}/accept
     */
    offerControllerAcceptOffer: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/offer/${id}/accept`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerSingleOffer
     * @summary Single offer
     * @request GET:/offer/{productId}/{userId}/single
     */
    offerControllerSingleOffer: (productId: string, userId: string, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/offer/${productId}/${userId}/single`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerUpdate
     * @summary Update
     * @request POST:/offer/{id}/approve
     */
    offerControllerUpdate: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<ProductBase, any>({
        path: `/offer/${id}/approve`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  notification = {
    /**
     * No description
     *
     * @tags Notification
     * @name NotificationControllerUnactionedNotificationSummary
     * @summary Unactioned notification summary
     * @request GET:/notification/summary
     */
    notificationControllerUnactionedNotificationSummary: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/notification/summary`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  nft = {
    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerBuyItem
     * @summary Buy item
     * @request POST:/nft
     */
    nftControllerBuyItem: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerAcceptOffer
     * @summary Accept offer
     * @request POST:/nft/acceptOffer
     */
    nftControllerAcceptOffer: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/acceptOffer`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerBuyItemWithErc20
     * @summary Buy item with erc 20
     * @request POST:/nft/buyItemWithERC20
     */
    nftControllerBuyItemWithErc20: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/buyItemWithERC20`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerListItem
     * @summary List item
     * @request POST:/nft/listItem
     */
    nftControllerListItem: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/listItem`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerCancelListing
     * @summary Cancel listing
     * @request POST:/nft/cancelListing
     */
    nftControllerCancelListing: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/cancelListing`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerCancelOffer
     * @summary Cancel offer
     * @request POST:/nft/cancelOffer
     */
    nftControllerCancelOffer: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/cancelOffer`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerCreateNftAndList
     * @summary Create nft and list
     * @request POST:/nft/createNFTAndList
     */
    nftControllerCreateNftAndList: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/createNFTAndList`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerCreateOffer
     * @summary Create offer
     * @request POST:/nft/createOffer
     */
    nftControllerCreateOffer: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/createOffer`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerUpdateListing
     * @summary Update listing
     * @request POST:/nft/updateListing
     */
    nftControllerUpdateListing: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/updateListing`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerUpdatePlatformFee
     * @summary Update platform fee
     * @request POST:/nft/updatePlatformFee
     */
    nftControllerUpdatePlatformFee: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/updatePlatformFee`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerRegisterRoyalty
     * @summary Register royalty
     * @request POST:/nft/registerRoyalty
     */
    nftControllerRegisterRoyalty: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/registerRoyalty`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerRegisterCollectionRoyalty
     * @summary Register collection royalty
     * @request POST:/nft/registerCollectionRoyalty
     */
    nftControllerRegisterCollectionRoyalty: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/registerCollectionRoyalty`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerTransferOwnership
     * @summary Transfer ownership
     * @request POST:/nft/transferOwnership
     */
    nftControllerTransferOwnership: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/transferOwnership`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerUpdateNftContract
     * @summary Update nft contract
     * @request POST:/nft/updateNFTContract
     */
    nftControllerUpdateNftContract: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/updateNFTContract`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerPayEscrow
     * @summary Pay escrow
     * @request POST:/nft/payEscrow
     */
    nftControllerPayEscrow: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/payEscrow`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerUpdatePlatformFeeRecipient
     * @summary Update platform fee recipient
     * @request POST:/nft/updatePlatformFeeRecipient
     */
    nftControllerUpdatePlatformFeeRecipient: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/updatePlatformFeeRecipient`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerUpdateTokenRegistry
     * @summary Update token registry
     * @request POST:/nft/updateTokenRegistry
     */
    nftControllerUpdateTokenRegistry: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/updateTokenRegistry`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerRenounceOwnership
     * @summary Renounce ownership
     * @request POST:/nft/renounceOwnership
     */
    nftControllerRenounceOwnership: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/renounceOwnership`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetNftContract1155
     * @summary Get nft contract 1155
     * @request GET:/nft/nftContract1155
     */
    nftControllerGetNftContract1155: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nft/nftContract1155`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetNftContract721
     * @summary Get nft contract 721
     * @request GET:/nft/nftContract721
     */
    nftControllerGetNftContract721: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nft/nftContract721`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetPlatformFee
     * @summary Get platform fee
     * @request GET:/nft/platformFee
     */
    nftControllerGetPlatformFee: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nft/platformFee`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetOwner
     * @summary Get owner
     * @request GET:/nft/owner
     */
    nftControllerGetOwner: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nft/owner`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetFeeReceipient
     * @summary Get fee receipient
     * @request GET:/nft/feeReceipient
     */
    nftControllerGetFeeReceipient: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nft/feeReceipient`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetTokenRegistry
     * @summary Get token registry
     * @request GET:/nft/tokenRegistry
     */
    nftControllerGetTokenRegistry: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nft/tokenRegistry`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetEscrow
     * @summary Get escrow
     * @request GET:/nft/escrow/nftAddress{}/tokenId{}
     */
    nftControllerGetEscrow: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/escrow/nftAddress{}/tokenId{}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetMinters
     * @summary Get minters
     * @request GET:/nft/minters/nftAddress{}/tokenId{}
     */
    nftControllerGetMinters: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/minters/nftAddress{}/tokenId{}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetListings
     * @summary Get listings
     * @request GET:/nft/listings/nftAddress{}/tokenId{}/ownerAddress{}
     */
    nftControllerGetListings: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/listings/nftAddress{}/tokenId{}/ownerAddress{}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetOffers
     * @summary Get offers
     * @request GET:/nft/offers/nftAddress{}/tokenId{}/ownerAddress{}
     */
    nftControllerGetOffers: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/offers/nftAddress{}/tokenId{}/ownerAddress{}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetRoyalties
     * @summary Get royalties
     * @request GET:/nft/royalties/nftAddress{}/tokenId{}
     */
    nftControllerGetRoyalties: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nft/royalties/nftAddress{}/tokenId{}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NFT
     * @name NftControllerGetCollectionRoyalties
     * @summary Get collection royalties
     * @request GET:/nft/collectionRoyalties/nftAddress{}
     */
    nftControllerGetCollectionRoyalties: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/nft/collectionRoyalties/nftAddress{}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  localization = {
    /**
     * No description
     *
     * @tags Localization
     * @name LocalizationControllerSaveTranslations
     * @summary Save translations
     * @request POST:/localization
     */
    localizationControllerSaveTranslations: (
      data: {
        values?: object[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/localization`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Localization
     * @name LocalizationControllerGetAllTranslations
     * @summary Get all translations
     * @request GET:/localization
     */
    localizationControllerGetAllTranslations: (params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/localization`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Localization
     * @name LocalizationControllerGetLangTranslations
     * @summary Get lang translations
     * @request GET:/localization/{langCode}
     */
    localizationControllerGetLangTranslations: (langCode: string, params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/localization/${langCode}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Localization
     * @name LocalizationControllerDeleteTranslation
     * @summary Delete translation
     * @request DELETE:/localization/{id}
     */
    localizationControllerDeleteTranslation: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/localization/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  debug = {
    /**
     * No description
     *
     * @tags Offer
     * @name OfferControllerTest
     * @summary Test
     * @request GET:/debug/paypal/token
     */
    offerControllerTest: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/debug/paypal/token`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  currency = {
    /**
     * No description
     *
     * @tags Currency
     * @name CurrencyControllerFind
     * @summary Find
     * @request GET:/currency
     */
    currencyControllerFind: (params: RequestParams = {}) =>
      this.request<ListResult, any>({
        path: `/currency`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerCreateAdmin
     * @summary Create admin
     * @request GET:/auth/createadmin
     * @secure
     */
    authControllerCreateAdmin: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/createadmin`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignIn
     * @summary Sign in
     * @request POST:/auth
     * @secure
     */
    authControllerSignIn: (
      data: {
        signature?: string;
        publicAddress?: string;
        muserid?: string;
        email?: string;
        nonce?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Auth, any>({
        path: `/auth`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignInOlder
     * @summary Sign in older
     * @request POST:/auth/signin-older
     * @secure
     */
    authControllerSignInOlder: (
      data: {
        signature?: string;
        publicAddress?: string;
        muserid?: string;
        email?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Auth, any>({
        path: `/auth/signin-older`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerConfirmTerms
     * @summary Confirm terms
     * @request GET:/auth/register/terms
     * @secure
     */
    authControllerConfirmTerms: (params: RequestParams = {}) =>
      this.request<BaseUser, any>({
        path: `/auth/register/terms`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerConfirmSignup
     * @summary Confirm signup
     * @request POST:/auth/register/verify
     * @secure
     */
    authControllerConfirmSignup: (data?: any, params: RequestParams = {}) =>
      this.request<BaseUser, any>({
        path: `/auth/register/verify`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerOauth
     * @summary Oauth
     * @request GET:/auth/common/oauth
     * @secure
     */
    authControllerOauth: (params: RequestParams = {}) =>
      this.request<Auth, any>({
        path: `/auth/common/oauth`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignup
     * @summary Signup
     * @request GET:/auth/register/details
     * @secure
     */
    authControllerSignup: (params: RequestParams = {}) =>
      this.request<BaseUser, any>({
        path: `/auth/register/details`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerCommonSignIn
     * @summary Common sign in
     * @request POST:/auth/common
     * @secure
     */
    authControllerCommonSignIn: (
      data: {
        usernameOrEmail?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Auth, any>({
        path: `/auth/common`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerTvSignIn
     * @summary Tv sign in
     * @request POST:/auth/common/tv
     * @secure
     */
    authControllerTvSignIn: (data?: any, params: RequestParams = {}) =>
      this.request<Auth, any>({
        path: `/auth/common/tv`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  bids = {
    /**
     * No description
     *
     * @tags Bid
     * @name BidControllerMine
     * @summary Mine
     * @request GET:/bids/mine
     */
    bidControllerMine: (
      query?: {
        name?: string;
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/bids/mine`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  auction = {
    /**
     * No description
     *
     * @tags Auction
     * @name AuctionControllerList
     * @summary List
     * @request GET:/auction
     */
    auctionControllerList: (
      query?: {
        name?: string;
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/auction`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auction
     * @name AuctionControllerMine
     * @summary Mine
     * @request GET:/auction/mine
     */
    auctionControllerMine: (
      query?: {
        name?: string;
        limit?: any;
        offset?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, any>({
        path: `/auction/mine`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auction
     * @name AuctionControllerGetOne
     * @summary Get one
     * @request GET:/auction/{id}/info
     */
    auctionControllerGetOne: (id: string, params: RequestParams = {}) =>
      this.request<Auction, any>({
        path: `/auction/${id}/info`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auction
     * @name AuctionControllerCompleteAuction
     * @summary Complete auction
     * @request POST:/auction/{id}/complete
     */
    auctionControllerCompleteAuction: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<AuctionBid, any>({
        path: `/auction/${id}/complete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auction
     * @name AuctionControllerPlaceBid
     * @summary Place bid
     * @request POST:/auction/{id}/bid
     */
    auctionControllerPlaceBid: (id: string, data?: any, params: RequestParams = {}) =>
      this.request<AuctionBid, any>({
        path: `/auction/${id}/bid`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
