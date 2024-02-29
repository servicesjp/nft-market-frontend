import { apiCoinMarketCap } from "./market-api-client";

interface CurrencyData {
  currencyId: number;
}

export type BlocksizeType = "marketCap" | "volume";
export type LimitType = "all" | "top10" | "top50" | "top100";
export type PeriodType =
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "1h"
  | "2h"
  | "3h"
  | "4h"
  | "6h"
  | "12h"
  | "1d"
  | "2d"
  | "3d"
  | "7d"
  | "14d"
  | "15d"
  | "30d"
  | "60d"
  | "90d"
  | "365d";

interface DominanceCriteria {
  blocksize: BlocksizeType;
  limitType?: LimitType;
}

export async function fetchCoinData({ id, symbol, time_start, time_end, interval }: any): Promise<any> {
  const {data} = await apiCoinMarketCap.get("/v2/cryptocurrency/ohlcv/historical", {
    params: {
      id,
      symbol,
      time_start,
      time_end,
      interval,
      time_period: "hourly"
    }
  });

  // Transforma los datos al formato necesario para lightweight-charts
  const quotes = symbol ? data.data[symbol][0].quotes : data.data.quotes;
  const transformedData = quotes.map((quote: any) => ({
    time: new Date(quote.time_close).getTime() / 1000,
    open: quote.quote.USD.open,
    high: quote.quote.USD.high,
    low: quote.quote.USD.low,
    close: quote.quote.USD.close,
    volume: quote.quote.USD.volume,
  }));
  // debugger;
  return transformedData;
}

export async function getCurrencyInfo({ currencyId }: CurrencyData): Promise<any> {
  const response = await apiCoinMarketCap.get("/v1/cryptocurrency/quotes/latest", {
    params: {
      id: currencyId
    }
  });

  return response;
}

export async function getLatestListings({limit}: any): Promise<any> {
  const params: any = {
    limit
  };
  
  const {data} = await apiCoinMarketCap.get("/v1/cryptocurrency/listings/latest", {
    params: params
  });

  return {data};
}

export async function getGlobalMetrics(): Promise<any> {
  const response = await apiCoinMarketCap.get("/v1/global-metrics/quotes/latest");
  return response;
}

export async function getDominance(criteria: DominanceCriteria): Promise<any> {
  const limit = () => {
    switch(criteria.limitType) {
      case "top10": return 10;
      case "top50": return 50;
      case "top100": return 100;
      default: return 500;
    }
  }
  // debugger;
  const {data: listings} = await getLatestListings({limit: limit() as unknown as number});
  const {data: globalMetrics} = await getGlobalMetrics();

  let totalValue: number;
  let valueKey: string;

  if (criteria.blocksize === "marketCap") {
    totalValue = globalMetrics.data.quote.USD.total_market_cap;
    valueKey = "market_cap";
  } else if (criteria.blocksize === "volume") {
    totalValue = globalMetrics.data.quote.USD.total_volume_24h;
    valueKey = "volume_24h";
  } else {
    throw new Error("Blocksize type not recognized");
  }

  const currenciesWithDominanceBelowThreshold = listings.data.filter((currency: any) => {
    const value = currency.quote.USD[valueKey];
    const dominance = (value / totalValue) * 100;
    return dominance < 0.07;
  });

  const totalValueForOthers = currenciesWithDominanceBelowThreshold.reduce((acc: any, currency: { quote: { USD: { [x: string]: any; }; }; }) => acc + currency.quote.USD[valueKey], 0);
  const totalActualPriceForOthers = currenciesWithDominanceBelowThreshold.reduce((acc: any, currency: { quote: { USD: { price: any; }; }; }) => acc + currency.quote.USD.price, 0);
  const totalChangeForOthers = currenciesWithDominanceBelowThreshold.reduce((acc: any, currency: { quote: { USD: { percent_change_24h: any; }; }; }) => acc + currency.quote.USD.percent_change_24h, 0);

  const othersObject = {
    id: "others",
    name: "Others",
    symbol: "others",
    value: totalValueForOthers,
    dominance: (totalValueForOthers / totalValue) * 100,
    actualPrice: totalActualPriceForOthers,
    change: totalChangeForOthers / currenciesWithDominanceBelowThreshold.length
  };

  const currencies = listings.data
    .filter((currency: any) => {
      const value = currency.quote.USD[valueKey];
      const dominance = (value / totalValue) * 100;
      return dominance >= 0.07;
    })
    .map((currency: any) => {
      const value = currency.quote.USD[valueKey];
      const dominance = (value / totalValue) * 100;

      return {
        id: currency.id,
        name: currency.name,
        symbol: currency.symbol,
        value: value,
        dominance: dominance,
        actualPrice: currency.quote.USD.price,
        change: currency.quote.USD.percent_change_24h
      };
    });

  currencies.push(othersObject);

  return currencies;
}