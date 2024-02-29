import moment from "moment";
import { apiClient } from "./market-api-client";
import { getMarketInfo, TradingPair } from "./market-info-service";

export interface TickerData {
    tradingPair: TradingPair;
    askPrice: number;
    bidPrice: number;
    highPrice: number;
    lowPrice: number;
    lastPrice: number;
    prevDayPrice: number;
    prevDayDiffPercent: number;
    volume: number;
    trendUp: boolean;
    lastUpdated: Date;
  }

  const isValidDate = (dateString: any) => {
    return moment(dateString, moment.ISO_8601, true).isValid();
  };
  
  export async function getTicker() : Promise<TickerData[]> {
    const marketInfo = await getMarketInfo()
    const response = await apiClient.get("/market/get-ticker");
  
    const calcPriceDiff = (prevDayPrice: number, lastPrice: number) => {
      if (prevDayPrice === 0 || lastPrice === 0) {
        return 0
      }
      return (lastPrice / prevDayPrice) - 1
    }
  
    return response.data.map((ticker: any) => {
      const lastUpdatedValue = isValidDate(ticker?.[9]) ? moment(ticker?.[9]).toDate() : new Date(); // Si no es válido, se establece la fecha actual como valor predeterminado

      return {
        tradingPair: marketInfo.getTradingPair(ticker?.[0]),
        askPrice: ticker?.[1],
        bidPrice: ticker?.[2],
        highPrice: ticker?.[3],
        lowPrice: ticker?.[4],
        lastPrice: ticker?.[5],
        prevDayPrice: ticker?.[6],
        prevDayDiffPercent: calcPriceDiff(Number(ticker?.[5]), Number(ticker?.[6])),
        volume: ticker?.[7],
        trendUp: ticker?.[8],
        lastUpdated: lastUpdatedValue,
      } as TickerData

    })
  }