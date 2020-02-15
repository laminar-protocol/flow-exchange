import BN from 'bn.js';
import _ from 'lodash';

import { IconProp } from '../components';
import { addresses, tokens } from '../config';
import { UINT256_MAX, UINT256_MIN, fromWei, toWei } from '../helpers/unitHelper';
import { CurrencyData, Pool, Token } from '../types';
import { BaseApi } from './BaseApi';
import Ethereum from './Ethereum';

class EthereumApi extends BaseApi {
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
    super();
    this.provider = new Ethereum();
  }

  public enable = async () => {
    const result = await this.provider.provider.enable();
    this.accounts$.next(
      (result as string[]).map(s => ({
        address: s,
      })),
    );
    return result;
  };

  public getPools = async () => {
    return [
      {
        name: 'Laminar',
        id: addresses.pool,
        address: addresses.pool,
      },
      {
        name: 'ACME',
        id: addresses.pool2,
        address: addresses.pool2,
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

  public getCurrencyData = async (poolAddr: string, tokenAddr: string) => {
    const { ask, bid } = await this.getSpread(poolAddr, tokenAddr);
    const contract = this.provider.getLiquidityPoolContract(poolAddr);
    const additionalCollateralRatio: string = await contract.methods.getAdditionalCollateralRatio(tokenAddr).call();
    return {
      additionalCollateralRatio: Number(additionalCollateralRatio),
      askSpread: ask,
      bidSpread: bid,
    } as CurrencyData;
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
    const contract = this.provider.getLiquidityPoolContract(poolAddr);

    const [ratio, amount] = await Promise.all<number, string>([
      contract.methods.getAdditionalCollateralRatio(addresses.iToken).call(),
      this.provider.tokens.iUSD.methods.balanceOf(poolAddr).call(),
    ]);

    return fromWei(new BN(amount).mul(new BN(ratio + 1)));
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

  public getOrcalePrice = () => {
    throw new Error('not support');
  };
}

export default EthereumApi;
