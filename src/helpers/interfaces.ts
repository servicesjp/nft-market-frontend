import { TradingPair } from "@/modules/market/market-info-service";


export interface IOrderFuture {
    id: string,
    pairId: number,
    type: number,
    side: number,
    average: number,
    price: number,
    amount: number,
    filled: number,
    triggerCondition: string,
    status: number,
    date: string,
    fills: IFill[],
    isCtradeOrder: boolean,
    IsCtradeProOrder: boolean,
    pair?: any;
}
export enum TradePageType {
    Spot, Margin, Derivative,
}
export const ISpotTypes = ['Spot', 'Cross', 'Isolated'];
export const MorderTypes = ['Normal', 'Borrow', 'Repay'];
export enum MEorderTypes {
    Normal, Borrow, Repay
};

export interface IFill {
    rate?: number;
    quantity?: number;
    fee?: string,
    time?: string,
    pairId?: number,
    pair?: TradingPair;
    side?: string,
    total?: string,
}
export interface IOrdersSearch {
    marketCurrency?: number,
    baseCurrency?: number,
    side?: number,
    type?: number,
    date?: string
}
export interface IOrdersMySearch {
    marketCurrency?: number,
    baseCurrency?: number,
    side?: number,
    Type: 'trade_history' | 'order_history' | 'open_orders',
    Date?: string,
    CurrentPageIndex?: number
}
export interface IUserLeverageSetting {
    pairId?: number,
    leverage?: number,
    mode?: number,
}
export const FMode = ['Isolated', 'Cross'];
export interface IFutureLimit { // max allowed amount in specific tier
    "Id"?: number,
    "PairId"?: number,
    "Tier"?: number,
    "MinPositionSize"?: number,
    "MaxPositionSize"?: number,
    "MaxLeverage"?: number,
    "MaintainanceMarginRate"?: number,
    "MaintainanceAmount"?: number,
}
export interface IApiResponse {
    Message: string,
    Status: boolean,
    config: any,
    data: any,
    headers: any,
    request: any,
    status: number,
    statusText: string,
}
export interface ICreateOrder {
    "IsReduceOnly": boolean,
    "OrderType": number, // limit market stop
    "PairId": number,
    "Quantity": string,
    "Rate": string,
    "Stop": number,
    "Type": number, // buy sell type
    "isCtradeOrder": boolean,
}
export interface IChainInfo {
    chainId?: number;
    currencyId?: number;
    chainName?: string;
    withdrawFee?: number;
    minWithdraw?: number;
    canWithdraw?: boolean;
    canDeposit?: boolean;
    depositAddressCurrency?: number;
    isSelected?: {};
    feePer?: string;
}
export const MMode = ['Isolated', 'Cross'];
export interface IUserFuturePosition {
    "Id"?: string,
    "PairId"?: number,
    // "pair"?: TradingPair,
    "UserId"?: number,
    "Quantity"?: number,
    "EntryPrice"?: number,
    "Margin"?: number,
    "PositionSide"?: number,
    "MarginMode"?: number,
    "Leverage"?: number,
    "LiquidityPrice"?: number,
    "MarginRatio"?: number,
    "MaintainanceMargin"?: number,
    "Status"?: number,
    "OrderIds"?: number[],
    'PNLAmount'?: string,
    'pNLPercentage'?: string,
}
export interface IMargnPosition {
    "Id"?: String,
    "PairId"?: number,
    "UserId"?: number,
    "Quantity"?: number,
    "EntryPrice"?: number,
    "PositionSide"?: number,
    "MarginMode"?: number,
    "TotalBalance"?: number,
    "Debt"?: number,
    "Interest"?: number,
    "LiquidityPrice"?: number,
    "MarginLevel"?: number,
    "Leverage"?: number,
    "Status"?: number,
    "RealizedPNL"?: number,
    "PositionLastLiquidated"?: string,
    "RealizedPNLDiff"?: number,
    'PNLAmount'?: string,
    'pNLPercentage'?: string,

}
export interface IUserSettings {
    isUSDQuantity?: boolean,
    IsReduceOnly?: boolean,
}