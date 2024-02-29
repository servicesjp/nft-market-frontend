// import { IUserLeverageSetting } from "@/helpers/interfaces";
import { ObjectToQueryParam } from "../encrypted-exchange/signature";
import { apiClient } from "./market-api-client";

export class InvalidTradingPairError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTradingPairError";
  }
}

export class MarketInfo {
  tradingPairs: TradingPair[];
  currencies: Currency[];

  constructor({
    tradingPairs,
    currencies,
  }: {
    tradingPairs: TradingPair[];
    currencies: Currency[];
  }) {
    this.tradingPairs = tradingPairs;
    this.currencies = currencies;
  }

  getTradingPairBySymbol(symbol: string): TradingPair {
    const tradingPair = this.tradingPairs.find(
      (tradingPair) => tradingPair.symbol === symbol
    );
    if (!tradingPair) {
      throw new InvalidTradingPairError(
        `Trading pair with symbol ${symbol} not found`
      );
    }
    return tradingPair;
  }

  getTradingPair(id: number): TradingPair {
    const tradingPair = this.tradingPairs.find(
      (tradingPair) => tradingPair.id === id
    );
    if (!tradingPair) {
      throw new InvalidTradingPairError(`Trading pair with id ${id} not found`);
    }
    return tradingPair;
  }
}

export interface TradingPair {
  id: number;
  symbol: string;
  baseCurrency: Currency;
  quoteCurrency: Currency;
  minimumTotal: number;
  minimumAmount: number;
  marketPrecision: number;
  basePrecision: number;
  status: TradingPairStatus;
  type: TradingPairType;
  contractDetail?: ICOntractDetail;
  isDerivatePair?: boolean,
  isMarginEnabled?: boolean,
  isSpotPair?: boolean,
  futureInfo?: IFutureInfo,
  addedDate?: string,
  margin?: IMarginInfo;
}
export interface IFutureInfo {
  Type?: number,
  fundingInterval?: number,
  minLeverage?: number,
  maxLeverage?: number,
  ordersLimit?: number,
  interestRate?: number,
  liquidationFees?: number,
}
export interface IMarginInfo {
  isMarginEnabled?: true,
  crossLVG?: number,
  isolatedLVG?: 0
}
export interface ICOntractDetail {
  type?: number,
  fundingInterval?: number,
  minLeverage?: number,
  maxLeverage?: number,
  ordersLimit?: number,
  interestRate?: number,
  liquidationFees?: number,
}
export interface IGetData {
  AndroidVersion: number;
  // Currencies: any[]
  IOSVersion: number,
  // Pairs: any[],
  ServerTime: number,
  Version: number,
  //   Version: number,
  // ServerTime	[...]
  // AndroidVersion	[...]
  // IOSVersion	[...]
  SpotPairs: any[]
  SpotCurrencies: any[]
  FuturePairs: any[]
  FutureCurrencies: any[]
}


export enum TradingPairType {
  Normal = 0,
  Leverage = 1,
  FuturesContract = 2,
  Stock = 3
}

export enum TradingPairStatus {
  Disabled = 0,
  Active = 1
}

export enum CurrencyType {
  Crypto = 0,
  Fiat = 1,
  Leverage = 2,
  Contract = 3
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  type: CurrencyType;
  chain: Chain[];
  precision: number;
  minimumWithdraw: number;
  canWithdraw: boolean;
  isDerivativeCurrency: boolean;
  isSpotCurrency: boolean,
}
export interface Chain {
  id: number;
  name: string;
}
function findCurrency(id: number, currencies: Currency[]): Currency {
  const currency = currencies.find((currency) => currency.id === id);
  if (!currency) {
    throw new Error(`Currency with id ${id} not found`);
  }
  return currency;
}
let settingskey = 'settings';
function gelLocalSettings(): IGetData | null {
  let settings = localStorage.getItem(settingskey);
  if (settings) {
    return JSON.parse(settings);
  } else {
    return settings as null;
  }
}
function saveSetting(settings: IGetData) {
  localStorage.setItem(settingskey, JSON.stringify(settings));
}
let marketInfo: MarketInfo | null = null;
export function getPairById(id: number): TradingPair {
  let pair = marketInfo?.tradingPairs.find(p => p.id === id);
  return pair!;
}
export function getCurrencyById(id: number): Currency {
  let crncy = marketInfo?.currencies.find(p => p.id === id);
  return crncy!;
}

function parseMarketInfo(response: IGetData): MarketInfo {
  let currencies: Currency[] = [];
  response.SpotCurrencies.map((currency: any) => {
    const chains = currency[11].map((chain: any) => {
      return {
        id: chain[4],
        name: chain[3],
      };
    });
    let crncy = {
      id: currency[0],
      name: currency[1],
      symbol: currency[2],
      type: currency[3],
      precision: currency[9],
      minimumWithdraw: currency[5],
      canWithdraw: currency[8],
      chain: chains,
      isSpotCurrency: true,
      isDerivativeCurrency: false,
    } as Currency;
    currencies.push(crncy);
  });
  response.FutureCurrencies.map((currency: any) => {
    // const chains = [];
    let crncy = {
      id: currency[0],
      name: currency[1],
      symbol: currency[2],
      type: currency[3],
      precision: currency[9],
      minimumWithdraw: currency[5],
      canWithdraw: currency[8],
      chain: [],
      isDerivativeCurrency: true,
      isSpotCurrency: false,
    } as Currency;
    currencies.push(crncy);
  });
  let tradingPairs: TradingPair[] = [];
  // let PairOb =
  response.SpotPairs.map((tradingPair: any) => {

      let pair: TradingPair = {
        id: tradingPair?.[0],
        symbol: tradingPair?.[1],
        quoteCurrency: findCurrency(tradingPair?.[2], currencies),
        baseCurrency: findCurrency(tradingPair?.[3], currencies),
        minimumTotal: tradingPair?.[4],
        minimumAmount: tradingPair?.[5],
        marketPrecision: tradingPair?.[6],
        basePrecision: tradingPair?.[7],
        status: tradingPair?.[8],
        type: tradingPair?.[9],
      }
      pair.isSpotPair = true;
      pair.isMarginEnabled = tradingPair?.[11]?.[0];
  
      if (pair.id === 6) {
        pair.isMarginEnabled = false;
      }
      pair.isDerivatePair = false;
      if (pair.isMarginEnabled) {
        pair.margin = {};
        pair.margin.isMarginEnabled = tradingPair?.[11]?.[0];
        pair.margin.crossLVG = tradingPair?.[11]?.[1];
        pair.margin.isolatedLVG = tradingPair?.[11]?.[2];
      }
      tradingPairs.push(pair);
    // return  as TradingPair;
  });
  response.FuturePairs.map((tradingPair: any) => {
    let pair: TradingPair = {
      id: tradingPair[0],
      symbol: tradingPair[1],
      quoteCurrency: findCurrency(tradingPair[2], currencies),
      baseCurrency: findCurrency(tradingPair[3], currencies),
      minimumTotal: tradingPair[4],
      minimumAmount: tradingPair[5],
      marketPrecision: tradingPair[6],
      basePrecision: tradingPair[7],
      status: tradingPair[8],
      type: tradingPair[9],
    }
    if (pair.type === TradingPairType.FuturesContract) {
      pair.isSpotPair = false;
      pair.isMarginEnabled = false;
      pair.isDerivatePair = true;
      pair.contractDetail = {
        fundingInterval: tradingPair[11][1],
        minLeverage: tradingPair[11][2],
        maxLeverage: tradingPair[11][3],
        ordersLimit: tradingPair[11][4],
        interestRate: tradingPair[11][5],
        liquidationFees: tradingPair[11][6]
      }
    }
    tradingPairs.push(pair);
    // return  as TradingPair;

  });


  marketInfo = new MarketInfo({
    currencies: currencies,
    tradingPairs: tradingPairs,
  });

  return marketInfo;
}

export async function getMarketInfo(): Promise<MarketInfo> {
  if (marketInfo) {
    return marketInfo;
  }

  let localsettings = gelLocalSettings();
  if (localsettings !== null) {
    let params = ObjectToQueryParam({ version: localsettings.Version })
    apiClient.get("/market/get-data-new" + params).then((res) => {
      // debugger
      if (localsettings?.Version !== res.data.Version) {
        saveSetting(res.data);
        window.location.reload();
      }
    });

    try {
      return parseMarketInfo(localsettings);
    } catch (err) {
      // log error and proceed to load from API if parsing from local storage fails
      console.error("Failed to parse cached market info. Reloading from API.", err);
    }
  }

  const response = (await apiClient.get("/market/get-data-new")).data;
  saveSetting(response);
  return parseMarketInfo(response);
}

export async function getCurrencies(): Promise<Currency[]> {
  const marketInfo = await getMarketInfo();
  return marketInfo.currencies;
}
export async function getPairs(): Promise<TradingPair[]> {
  const marketInfo = await getMarketInfo();
  return marketInfo.tradingPairs;
}
