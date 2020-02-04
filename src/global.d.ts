import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { reducer } from 'reducers';
import { Action as ReduxAction } from 'redux';
import { Epic as ReduxEpic } from 'redux-observable';

declare global {
  /** */
  export interface StateWithId<T, I = string, P = void, E = any> extends ApiLoadableState<T, P, E> {
    id?: I;
  }

  export type PartialStateWithId<T, I = string, P = void, E = any> = Partial<StateWithId<T, I, P, E>>;

  export interface MultiState<T, I = string, P = void, E = any> {
    states: Record<string | number, StateWithId<T, I, P, E>>;
    lastId?: I;
  }

  export interface ApiLoadableState<T, P = void, E = any> {
    value?: T;
    loading: boolean;
    params?: P;
    error?: E;
  }

  export type PartialState<T, P = void, E = any> = Partial<ApiLoadableState<T, P, E>>;

  export interface ApiLodableAction<T> extends Action<T> {
    error?: boolean;
  }

  export interface Action<T> extends ReduxAction<string> {
    payload?: T;
  }

  export type ActionCreator<T> = (payload?: T) => Action<T>;

  export type ApiActionTypesRecord<P> = Record<typeof ApiActionTypes[number], ActionCreator<P>>;
  export type ChangedActionTypesRecord<P> = Record<typeof ChangedActionTypes[number], ActionCreator<P>>;
  export type ToggledActionTypesRecord<P> = Record<typeof ToggledActionTypes[number], ActionCreator<P>>;
  export type TriggerActionTypesRecord<P> = Record<typeof TriggerActionTypes[number], ActionCreator<P>>;

  export type AppState = ReturnType<ReturnType<typeof reducer>>;

  export type Epic = ReduxEpic<any, any, AppState>;

  /** */
  export type Network = 'mainnet' | 'kovan' | 'development';

  export type Address = string;

  export type TokenSymbol = 'DAI' | 'fEUR' | 'fJPY' | 'fXAU' | 'fAAPL';

  export type TradingSymbol = 'EURUSD' | 'USDJPY' | 'XAUUSD' | 'USDAAPL';

  export type TradingPairSymbol =
    | 'l10USDEUR'
    | 's10USDEUR'
    | 'l20USDJPY'
    | 's20USDJPY'
    | 'l20USDXAU'
    | 's20USDXAU'
    | 'l5USDAAPL'
    | 's5USDAAPL';

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
    id: string;
    key: string;
    address: Address;
    name: string;
    spread?: number;
  }

  export interface PriceData {
    id: string;
    value: number;
    updatedAt: number;
  }
}
