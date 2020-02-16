import { types } from '@laminar/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import BN from 'bn.js';

import { CurrencyData, IconProp, Pool, Token } from '../types';
import { fromPrecision, toPrecision } from '../utils';
import { BaseApi } from './BaseApi';
import { Injected } from './PolkadotApi.types';

class PolkadotApi extends BaseApi {
  public tokens: Token[] = [
    {
      name: 'LAMI',
      displayName: 'LAMI',
      precision: 18,
      currencySymbol: '$',
      icon: 'dollar-sign' as IconProp,
      isBaseToken: false,
      isNetworkToken: true,
      id: '0',
    },
    {
      name: 'AUSD',
      displayName: 'AUSD',
      precision: 18,
      currencySymbol: '$',
      icon: 'dollar-sign' as IconProp,
      isBaseToken: true,
      isNetworkToken: false,
      id: '1',
    },
    {
      name: 'FEUR',
      displayName: 'Euro',
      precision: 18,
      currencySymbol: '€',
      icon: 'euro-sign' as IconProp,
      isBaseToken: false,
      isNetworkToken: false,
      id: '2',
    },
    {
      name: 'FJPY',
      displayName: 'Yen',
      precision: 18,
      currencySymbol: '¥',
      icon: 'yen-sign' as IconProp,
      isBaseToken: false,
      isNetworkToken: false,
      id: '3',
    },
  ];

  private api: ApiPromise;

  public provider?: Injected;

  constructor() {
    super();
    this.api = new ApiPromise({ provider: new WsProvider('wss://testnet-node-1.laminar-chain.laminar.one/ws') });
    this.api.registerTypes(types as any);
  }

  private getTokenDef(findName: string) {
    const result = this.tokens.find(({ name }) => name === findName);
    if (!result) throw new Error('token name is undefined');
    return result;
  }

  public enable = async () => {
    this.provider = (await (window as any).injectedWeb3['polkadot-js'].enable('FLOW EXCHANGE')) as Injected;
    this.provider.accounts.subscribe(accounts => {
      this.accounts$.next(
        accounts.map(({ address }) => ({
          address,
        })),
      );
    });

    await this.api.isReady;
    this.api.setSigner(this.provider.signer);
    this.ready$.next(true);
  };

  public getBalance = async (address: string, token: string) => {
    // @TODO remove isReady
    await this.api.isReady;
    const tokenDef = this.getTokenDef(token);
    const result: any = await this.api.query.tokens.balance(tokenDef.id, address);
    return new BN(result.toString());
  };

  public redeem = async (account: string, poolId: string, fromToken: string, fromAmount: string) => {
    const token = this.getTokenDef(fromToken);

    console.log('redeem:', fromToken);

    return new Promise(resolve => {
      this.api.tx.syntheticProtocol
        .redeem(poolId, token.id, toPrecision(fromAmount, token.precision), '1000000')
        .signAndSend(account, ({ status }) => {
          if (status.isFinalized) {
            resolve();
          }
        });
    });
  };

  public mint = async (account: string, poolId: string, toToken: string, fromAmount: string) => {
    const token = this.getTokenDef(toToken);
    console.log(toToken);

    return new Promise(resolve => {
      this.api.tx.syntheticProtocol
        .mint(poolId, token.id, toPrecision(fromAmount, token.precision), '1000000')
        .signAndSend(account, ({ status }) => {
          if (status.isFinalized) {
            resolve();
          }
        });
    });
  };

  public getPools = async () => {
    await this.api.isReady;

    const nextPoolId: any = await this.api.query.liquidityPools.nextPoolId();

    return Promise.all(
      Array.from(Array(nextPoolId.toNumber()).keys()).map(id => {
        return this.api.query.liquidityPools.owners(id).then(result => ({
          id: `${id}`,
          address: result.toJSON() as string,
          name: (result.toJSON() as string).slice(0, 12),
        }));
      }),
    );
  };

  public getCurrencyData = async (poolId: string, tokenId: string): Promise<CurrencyData> => {
    const data: any = await this.api.query.liquidityPools.liquidityPoolOptions(poolId, tokenId);
    if (!data) {
      return {
        bidSpread: null,
        askSpread: null,
        additionalCollateralRatio: null,
        enabled: null,
      };
    }

    const bidSpread = data.value.get('bidSpread');
    const askSpread = data.value.get('askSpread');
    const additionalCollateralRatio = data.value.get('additionalCollateralRatio');

    return {
      bidSpread: bidSpread !== null ? Number(fromPrecision(bidSpread.toString(10), 6)) : null,
      askSpread: askSpread !== null ? Number(fromPrecision(askSpread.toString(10), 6)) : null,
      additionalCollateralRatio:
        additionalCollateralRatio !== null ? Number(fromPrecision(additionalCollateralRatio.toString(10), 6)) : null,
      enabled: null,
    };
  };

  public getOrcalePrice = async (tokenId: string) => {
    await this.api.isReady;
    const token = this.getTokenDef(tokenId);
    const result = (await this.api.query.oracle.values(token.id)) as any;
    return result.value.get('value');
  };

  public getTokenLiquidity = async (pool: Pool, tokenId: string) => {
    await this.api.isReady;
    const balance = (await this.api.query.tokens.balance(tokenId, pool.address)) as any;
    const { additionalCollateralRatio } = await this.getCurrencyData(pool.id, tokenId);
    return balance.mul(new BN(1 + (additionalCollateralRatio || 0)));
  };
}

export default PolkadotApi;
