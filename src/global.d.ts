import { IconProp } from '@fortawesome/fontawesome-svg-core';

declare global {
  export type Address = string;

  export type TokenSymbol = 'DAI' | 'fEUR' | 'fJPY' | 'fXAU' | 'fAAPL';

  export type TradingSymbol = 'EURUSD' | 'USDJPY' | 'XAUUSD';

  export type TradingPairSymbol =
    | 'l10USDEUR'
    | 's10USDEUR'
    | 'l20USDJPY'
    | 's20USDJPY'
    | 'l20USDXAU'
    | 's20USDXAU'
    | 'l5USDAPPL'
    | 's5USDAPPL';

  export interface Token {
    name: string;
    displayName: string;
    address: Address;
    currencySymbol: string;
    icon: IconProp;
    isBaseToken: boolean;
  }

  export interface TradingPair {
    symbol: string;
    base: TokenSymbol;
    quote: TokenSymbol;
    leverage: number;
    address: Address;
    name: string;
  }

  export interface Trading {
    name: string;
    long: TradingPairSymbol;
    short: TradingPairSymbol;
    chartSymbol: string;
    inverted: boolean;
    leverage: number;
    precision: number;
  }

  export interface Pool {
    key: string;
    address: Address;
    name: string;
    spread: number;
  }

  export interface PriceData {
    id: string;
    value: number;
    updatedAt: number;
  }
}
