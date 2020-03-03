import BN from 'bn.js';
import { abi, addresses, tokens, tradingPairs } from 'config';
import EventEmitter from 'eventemitter3';
import _ from 'lodash';
import { mapObjIndexed } from 'ramda';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';

import { UINT256_MAX, UINT256_MIN, fromWei, toWei } from '../helpers/unitHelper';
import { IconProp } from '../types';

// workaround to get types that are not exposed directly from web3
export type Eth = Web3['eth'];
export type Contract = InstanceType<Eth['Contract']>;

export interface Account {
  address: string;
}

export type Token = {
  name: string;
  displayName: string;
  precision: number;
  currencySymbol: string;
  icon: IconProp;
  isBaseToken: boolean;
  isNetworkToken: boolean;
  id: string;
};

export type Pool = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

export interface TradingPair {
  id: string;
  symbol: string;
  base: string;
  quote: string;
  leverage: number;
  address: string;
  name: string;
}

export type PoolOptions = {
  poolId: string;
  tokenId: string;
  additionalCollateralRatio: number | null;
  bidSpread: number | null;
  askSpread: number | null;
  syntheticEnabled: boolean;
};

class Ethereum {
  public readonly provider: any;
  public readonly web3: Web3;

  public readonly flowProtocol: Contract;
  public readonly flowMarginProtocol: Contract;

  public readonly oracle: Contract;
  public readonly moneyMarket: Contract;

  public readonly liquidityPool: Contract;

  public readonly tokens: {
    DAI: Contract;
    iUSD: Contract;
    fEUR: Contract;
    fJPY: Contract;
    fXAU: Contract;
    fAAPL: Contract;
  };

  public readonly faucets: {
    DAI: Contract;
  };

  public readonly marginTradingPairs: Record<string, Contract> = {};

  constructor() {
    // TODO: handle null provider
    let provider = null;
    const anyWindow = window as any;
    if (anyWindow.ethereum || anyWindow.web3) {
      provider = anyWindow.ethereum || anyWindow.web3.currentProvider;
      provider.autoRefreshOnNetworkChange = false;
    }

    this.provider = provider;
    this.web3 = new Web3(this.provider);

    this.flowProtocol = new this.web3.eth.Contract(abi.FlowProtocol, addresses.protocol);
    this.flowMarginProtocol = new this.web3.eth.Contract(abi.FlowMarginProtocol, addresses.marginProtocol);

    this.oracle = new this.web3.eth.Contract(abi.PriceOracleInterface, addresses.oracle);
    this.moneyMarket = new this.web3.eth.Contract(abi.MoneyMarket, addresses.moneyMarket);

    this.liquidityPool = new this.web3.eth.Contract(abi.LiquidityPoolInterface, addresses.pool);

    const daiContract = new this.web3.eth.Contract(abi.ERC20, addresses.baseToken);
    const iusdContract = new this.web3.eth.Contract(abi.ERC20, addresses.iToken);
    const eurContract = new this.web3.eth.Contract(abi.ERC20, addresses.fEUR);
    const jpyContract = new this.web3.eth.Contract(abi.ERC20, addresses.fJPY);
    const appleContract = new this.web3.eth.Contract(abi.ERC20, addresses.fAAPL);
    const xauContract = new this.web3.eth.Contract(abi.ERC20, addresses.fXAU);

    this.tokens = {
      DAI: daiContract,
      iUSD: iusdContract,
      fEUR: eurContract,
      fJPY: jpyContract,
      fAAPL: appleContract,
      fXAU: xauContract,
    };

    const daiFaucetContract = new this.web3.eth.Contract(abi.FaucetInterface, addresses.baseToken);
    this.faucets = {
      DAI: daiFaucetContract,
    };

    this.marginTradingPairs = mapObjIndexed(
      pair => new this.web3.eth.Contract(abi.MarginTradingPair, pair.address),
      tradingPairs,
    );
  }

  // TODO: Hack, need to unified tokens naming;
  getTokenContract(symbol: string) {
    return ((this.tokens as any)[symbol] || (this.tokens as any)[`f${symbol}`]) as Contract;
  }

  getFaucetContract(symbol: string) {
    return ((this.faucets as any)[symbol] || (this.faucets as any)[`f${symbol}`]) as Contract;
  }

  getLiquidityPoolContract(address: string) {
    return new this.web3.eth.Contract(abi.LiquidityPoolInterface, address);
  }
}

class EthereumApi {
  public tokens: Token[] = [
    {
      name: 'DAI',
      displayName: 'DAI',
      precision: 18,
      currencySymbol: '$',
      icon: 'dollar-sign' as IconProp,
      isBaseToken: true,
      isNetworkToken: false,
      id: addresses.baseToken,
    },
    {
      name: 'EUR',
      displayName: 'Euro',
      precision: 18,
      currencySymbol: '€',
      icon: 'euro-sign' as IconProp,
      isBaseToken: false,
      isNetworkToken: false,
      id: addresses.fEUR,
    },
    {
      name: 'JPY',
      displayName: 'Yen',
      precision: 18,
      currencySymbol: '¥',
      icon: 'yen-sign' as IconProp,
      isBaseToken: false,
      isNetworkToken: false,
      id: addresses.fJPY,
    },
    {
      name: 'XAU',
      displayName: 'Gold',
      precision: 18,
      currencySymbol: '',
      icon: 'cubes' as IconProp,
      isBaseToken: false,
      isNetworkToken: false,
      id: addresses.fXAU,
    },
    {
      name: 'AAPL',
      displayName: 'Apple',
      precision: 18,
      currencySymbol: '',
      icon: 'award' as IconProp,
      isBaseToken: false,
      isNetworkToken: false,
      id: addresses.fAAPL,
    },
  ];

  private provider: Ethereum;

  constructor() {
    this.provider = new Ethereum();
  }

  private _eventemitter = new EventEmitter();

  public accounts$ = new BehaviorSubject<Account[]>([]);

  public ready$ = new BehaviorSubject<boolean>(false);

  public enable = async () => {
    const result = await this.provider.provider.enable();
    this.accounts$.next(
      (result as string[]).map(s => ({
        address: s,
      })),
    );
    return result;
  };

  public getDefaultPools = async (): Promise<Pool[]> => {
    return [
      {
        name: 'Laminar',
        id: addresses.pool,
        address: addresses.pool,
        isDefault: true,
      },
      {
        name: 'ACME',
        id: addresses.pool2,
        address: addresses.pool2,
        isDefault: true,
      },
    ];
  };

  public getAllowance = async (account: string) => {
    const protocolAddress = this.provider.flowMarginProtocol.options.address;
    const result = await this.provider.tokens.DAI.methods.allowance(account, protocolAddress).call();
    return Number(fromWei(result));
  };

  public getAuthorization = async (account: string, symbol: string, address: string) => {
    const grantAddress = address || this.provider.flowProtocol.options.address;
    const contract = this.provider.getTokenContract(symbol);
    const balance = await contract.methods.allowance(account, grantAddress).call();

    return { symbol, balance, address: grantAddress };
  };

  public getAccounts = async (): Promise<string[]> =>
    new Promise((resolve, reject) => {
      this.provider.web3.eth.getAccounts((error, accounts) => {
        if (error) return reject(error);
        if (!accounts?.[0]) return reject(new Error('no account'));
        return resolve(accounts);
      });
    });

  public getNetworkType = async () => this.provider.web3.eth.net.getNetworkType();

  public daiFaucet = async (account: string, symbol: string, amount: number) => {
    const contract = this.provider.getFaucetContract(symbol);
    await contract.methods.allocateTo(account, toWei(amount as any)).send({ from: account });
  };

  public getPoolOptions = async (poolAddr: string, tokenAddr: string) => {
    const { ask, bid } = await this.getSpread(poolAddr, tokenAddr);
    const contract = this.provider.getLiquidityPoolContract(poolAddr);
    const additionalCollateralRatio: string = await contract.methods.getAdditionalCollateralRatio(tokenAddr).call();
    return {
      poolId: poolAddr,
      tokenId: tokenAddr,
      additionalCollateralRatio: Number(additionalCollateralRatio),
      askSpread: ask,
      bidSpread: bid,
    } as PoolOptions;
  };

  public getTokenLiquidity = async (pool: Pool, tokenId: string) => {
    const contract = this.provider.getLiquidityPoolContract(pool.address);

    const [ratio, amount] = await Promise.all<number, string>([
      contract.methods.getAdditionalCollateralRatio(tokenId).call(),
      this.provider.tokens.iUSD.methods.balanceOf(pool.address).call(),
    ]);

    return new BN(amount).mul(new BN(ratio + 1));
  };

  public getSpread = async (poolAddr: string, tokenAddr: string) => {
    const contract = this.provider.getLiquidityPoolContract(poolAddr);

    const [ask, bid] = await Promise.all([
      contract.methods.getAskSpread(tokenAddr).call(),
      contract.methods.getBidSpread(tokenAddr).call(),
    ]);

    return {
      ask: Number(fromWei(ask)),
      bid: Number(fromWei(bid)),
    };
  };

  public getLiquidity = async (poolAddr: string) => {
    return this.provider.tokens.iUSD.methods.balanceOf(poolAddr).call();
  };

  public getAllowedTokens = async (poolAddr: string) => {
    const contract = this.provider.getLiquidityPoolContract(poolAddr);

    // TODO: update this when contract provides a list of allowed tokens
    const baseTokens = Object.values(tokens).filter(i => i.isBaseToken === false);
    const spreads = await Promise.all(baseTokens.map(token => contract.methods.getBidSpread(token.address).call()));
    return _.zip(baseTokens, spreads)
      .filter(([, spread]) => spread !== 0)
      .map(([token]) => (token as { name: string }).name);
  };

  public getBalance = async (address: string, tokenId: string) => {
    const contract = this.provider.getTokenContract(tokenId);
    const balance = await contract.methods.balanceOf(address).call();
    return new BN(balance);
  };

  public redeem = async (account: string, poolId: string, fromSymbol: string, fromAmount: string) => {
    const from = this.provider.getTokenContract(fromSymbol);
    const fromAmountWei = toWei(fromAmount);

    const method = this.provider.flowProtocol.methods.redeem(from.options.address, poolId, fromAmountWei);
    await method.send({ from: account });
  };

  public mint = async (account: string, poolId: string, toSymbol: string, fromAmount: string) => {
    const to = this.provider.getTokenContract(toSymbol);
    const fromAmountWei = toWei(fromAmount);

    const method = this.provider.flowProtocol.methods.mint(to.options.address, poolId, fromAmountWei);
    await method.send({ from: account });
  };

  public grant = async (account: string, symbol: string, balance: number) => {
    const contract = this.provider.getTokenContract(symbol);
    await contract.methods.approve(addresses.protocol, balance).send({ from: account });
  };

  public toggleEnable = async (account: string, enable: boolean) => {
    const protocolAddress = this.provider.flowMarginProtocol.options.address;
    const amount = enable ? UINT256_MAX : UINT256_MIN;
    await this.provider.tokens.DAI.methods.approve(protocolAddress, amount).send({ from: account });
    return Number(fromWei(amount));
  };

  public openPosition = async (account: string, { name, amount, pool }: any) => {
    const pairAddress = addresses[name as keyof typeof addresses];
    await this.provider.flowMarginProtocol.methods
      .openPosition(pairAddress, pool, toWei(amount.toString().toString()))
      .send({ from: account });
  };

  public closePosition = async (account: string, { name, id }: any) => {
    const pairAddress = addresses[name as keyof typeof addresses];
    await this.provider.flowMarginProtocol.methods.closePosition(pairAddress, id).send({ from: account });
  };

  public getOraclePrice = () => {
    throw new Error('not support');
  };

  public getTradingPairs = async () => {
    return [
      {
        id: 'l10USDEUR',
        symbol: 'l10USDEUR',
        base: 'DAI',
        quote: 'fEUR',
        leverage: 10,
        address: addresses.l10USDEUR,
        name: 'USDEUR 10× Long',
      },
      {
        id: 's10USDEUR',
        symbol: 's10USDEUR',
        base: 'DAI',
        quote: 'fEUR',
        leverage: -10,
        address: addresses.s10USDEUR,
        name: 'USDEUR 10× Short',
      },
      {
        id: 'l20USDJPY',
        symbol: 'l20USDJPY',
        base: 'DAI',
        quote: 'fJPY',
        leverage: 20,
        address: addresses.l20USDJPY,
        name: 'USDJPY 20× Long',
      },
      {
        id: 's20USDJPY',
        symbol: 's20USDJPY',
        base: 'DAI',
        quote: 'fJPY',
        leverage: -20,
        address: addresses.s20USDJPY,
        name: 'USDJPY 20× Short',
      },
      {
        id: 'l20USDXAU',
        symbol: 'l20USDXAU',
        base: 'DAI',
        quote: 'fXAU',
        leverage: 20,
        address: addresses.l20USDXAU,
        name: 'XAUUSD 20× Long',
      },
      {
        id: 's20USDXAU',
        symbol: 's20USDXAU',
        base: 'DAI',
        quote: 'fXAU',
        leverage: -20,
        address: addresses.s20USDXAU,
        name: 'XAUUSD 20× Short',
      },
      {
        id: 'l5USDAAPL',
        symbol: 'l5USDAAPL',
        base: 'DAI',
        quote: 'fAAPL',
        leverage: 5,
        address: addresses.l5USDAAPL,
        name: 'AAPL 5× Long',
      },
      {
        id: 's5USDAAPL',
        symbol: 's5USDAAPL',
        base: 'DAI',
        quote: 'fAAPL',
        leverage: -5,
        address: addresses.s5USDAAPL,
        name: 'AAPL 5× Short',
      },
    ];
  };
}

export default EthereumApi;
