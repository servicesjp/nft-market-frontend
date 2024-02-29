import { apiClient } from "./market-api-client";

interface CandleStickRequest {
    /** CandleStick size in minutes, ie 1D = 1440 */
    resolutionMinutes: number;
    /** Symbol of pair, for example BTC/USDT */
    symbol: string;
    /** Start timestamp in unix epoch */
    from: number;
    /** end timestamp in unix epoch */
    to: number;
}

export interface CandleStickData {
    /** timestamp in unix epoch local time */
    time: number;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
}

export async function getCandleStick({ resolutionMinutes, from, to, symbol } : CandleStickRequest): Promise<CandleStickData[]> {
    let isFuture = symbol.indexOf('/') > -1 ? '' : '/futures';
    const url = isFuture + `/market/candle-stick?Symbol=${symbol}&Resolution=${resolutionMinutes}&From=${from}&To=${to}` 
    const response = await apiClient.get(url);
    const data = response.data
    const entries = []
    for (let i = 0; i < data['t'].length; i++) {
        entries.push({
            time: data['t'][i],
            high: data['h'][i],
            low: data['l'][i],
            open: data['o'][i],
            close: data['c'][i],
            volume: data['v'][i],
        })
    }
    return entries
  }