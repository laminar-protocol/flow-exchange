import { faBtc, faEthereum } from '@fortawesome/free-brands-svg-icons';
import { options } from '@laminar/api';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Signer } from '@polkadot/api/types';
import BN from 'bn.js';

import { CurrencyData, IconProp, Pool, Token } from '../types';
import { fromPrecision, toPrecision } from '../utils';
import { BaseApi } from './BaseApi';

interface Injected {
  readonly accounts: Accounts;
  readonly signer: Signer;
}

interface Account {
  readonly address: string;
  readonly genesisHash?: string;
  readonly name?: string;
}

// exposes accounts
interface Accounts {
  get: () => Promise<Account[]>;
  subscribe: (cb: (accounts: Account[]) => any) => () => void;
}

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
    {
      name: 'FBTC',
      displayName: 'BTC',
      precision: 18,
      currencySymbol: '',
      icon: faBtc,
      isBaseToken: false,
      isNetworkToken: false,
      id: '4',
    },
    {
      name: 'FETH',
      displayName: 'ETH',
      precision: 18,
      currencySymbol: '',
      icon: faEthereum,
      isBaseToken: false,
      isNetworkToken: false,
      id: '5',
    },
  ];

  private api: ApiPromise;

  public provider?: Injected;

  constructor() {
    super();
    this.api = new ApiPromise(
      options({
        provider: new WsProvider(
          'wss://node-6636393196323627008.jm.onfinality.io/ws?apikey=20cf0fa0-c7ee-4545-8227-4d488f71c6d2',
        ),
      }) as any,
    );
  }

  private getTokenDef(find: string) {
    const result = this.tokens.find(({ name, id }) => name === find || id === find);
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
    const result: any = await (this.api.derive as any).currencies.balance(address, tokenDef.name);
    return new BN(result.toString());
  };

  public redeem = async (account: string, poolId: string, fromToken: string, fromAmount: string) => {
    const token = this.getTokenDef(fromToken);

    console.log('redeem:', fromToken);

    return new Promise(resolve => {
      this.api.tx.syntheticProtocol
        .redeem(poolId, token.name, toPrecision(fromAmount, token.precision), '1000000')
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
        .mint(poolId, token.name, toPrecision(fromAmount, token.precision), '1000000')
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
    const token = this.getTokenDef(tokenId);

    const data: any = await this.api.query.liquidityPools.liquidityPoolOptions(poolId, token.name);
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
    const result = await (this.api.rpc as any).oracle.getValue(token.name);

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
