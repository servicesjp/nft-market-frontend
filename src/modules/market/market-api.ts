import { CandleStickData, getCandleStick } from "./market-candle-stick-service";
import { Currency, getCurrencies, TradingPair } from "./market-info-service";
import { getTicker, TickerData } from "./ticker-service";
import { getTradingVolume } from "./trading-volume-service";

export type {
  Currency,
  TickerData,
  TradingPair,
  CandleStickData
}

export {
  getTradingVolume,
  getCurrencies,
  getTicker,
  getCandleStick
}
