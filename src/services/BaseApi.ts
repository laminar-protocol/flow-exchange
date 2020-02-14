import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import { BehaviorSubject } from 'rxjs';

import { Account, CurrencyData, Pool, Token } from './types';

export abstract class BaseApi {
  private _eventemitter = new EventEmitter();

  public tokens: Token[] = [];

  public accounts$ = new BehaviorSubject<Account[]>([]);

  public ready$ = new BehaviorSubject<boolean>(false);

  public emit(type: string, ...args: any[]): boolean {
    return this._eventemitter.emit(type, ...args);
  }

  public on(type: string, handler: (...args: any[]) => any): this {
    this._eventemitter.on(type, handler);

    return this;
  }

  public off(type: string, handler: (...args: any[]) => any): this {
    this._eventemitter.removeListener(type, handler);

    return this;
  }

  public once(type: string, handler: (...args: any[]) => any): this {
    this._eventemitter.once(type, handler);

    return this;
  }

  abstract getBalance(address: string, token: string): Promise<BN>;

  abstract getPools(): Promise<Pool[]>;

  abstract redeem(account: string, poolId: string, fromSymbol: string, fromAmount: string): Promise<any>;

  abstract mint(account: string, poolId: string, toSymbol: string, fromAmount: string): Promise<any>;

  abstract getCurrencyData(poolId: string, token: string): Promise<CurrencyData>;

  abstract getOrcalePrice(tokenId: string): Promise<BN>;

  abstract getTokenLiquidity(poolAddr: Pool, tokenAddr: string): Promise<any>;

  // abstract enable(): Promise<string[]>;

  // abstract getAllowance(account: string): Promise<number>;

  // abstract getAuthorization(
  //   account: string,
  //   symbol: string,
  //   address: string,
  // ): Promise<{
  //   symbol: string;
  //   balance: any;
  //   address: string;
  // }>;

  // abstract getAccounts(): Promise<string[]>;

  // abstract getNetworkType(): Promise<string>;

  // abstract getSpread(
  //   tokenAddr: string,
  //   poolAddr: string,
  // ): Promise<{
  //   ask: number;
  //   bid: number;
  // }>;

  // abstract daiFaucet(account: string, symbol: string, amount: number): void;

  // abstract getLiquidity(poolAddr: string): Promise<string>;

  // abstract getAllowedTokens(poolAddr: string): Promise<string[]>;

  // abstract grant(account: string, symbol: string, balance: number): Promise<any>;

  // abstract toggleEnable(account: string, enable: boolean): Promise<number>;

  // abstract openPosition(account: string, params: any): Promise<void>;

  // abstract closePosition(account: string, params: any): Promise<void>;
}
