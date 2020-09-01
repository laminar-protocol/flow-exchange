import { ChainType, EthereumApi, LaminarApi, WsProvider } from '@laminar/api';
import EventEmitter from 'eventemitter3';

export * from '@laminar/api';

export interface Account {
  name: string;
  address: string;
}

export type AppEthereumApi = Api & EthereumApi;
export type AppLaminarApi = Api & LaminarApi;

class Api {
  private injected: any;
  private apiProvider: EthereumApi | LaminarApi;
  private _eventemitter = new EventEmitter();

  public chainType: ChainType;

  public currencies: LaminarApi['currencies'] | EthereumApi['currencies'];
  public margin: LaminarApi['margin'] | EthereumApi['margin'];
  public synthetic: LaminarApi['synthetic'] | EthereumApi['synthetic'];

  constructor({ chainType, endpoints: _endpoints }: { chainType?: ChainType; endpoints?: string[] } = {}) {
    const anyWindow = window as any;

    if (chainType === 'ethereum') {
      if (!anyWindow.ethereum && !anyWindow.web3) throw new Error('metamask not detect');
      this.injected = anyWindow.ethereum || anyWindow.web3.currentProvider;
      this.apiProvider = new EthereumApi({
        provider: this.injected,
      });
    } else if (chainType === 'laminar') {
      if (!anyWindow.injectedWeb3['polkadot-js']) throw new Error('polkadot extensions not detect');

      const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);

      const endpoints = _endpoints || [
        'wss://node-6685729082874970112.jm.onfinality.io/ws',
        'wss://node-6685729080656576512.rz.onfinality.io/ws',
        'wss://testnet-node-1.laminar-chain.laminar.one/ws',
      ];

      this.apiProvider = new LaminarApi({
        provider: new WsProvider(shuffle(endpoints)),
      });
    } else {
      throw new Error('chainType is either ethereum or laminar');
    }

    this.chainType = this.apiProvider.chainType;

    this.currencies = this.apiProvider.currencies;
    this.margin = this.apiProvider.margin;
    this.synthetic = this.apiProvider.synthetic;
  }

  public get isLaminar() {
    return this.chainType === 'laminar';
  }

  public get isEthereum() {
    return this.chainType === 'ethereum';
  }

  public get asLaminar() {
    return (this as any) as AppLaminarApi;
  }

  public get asEthereum() {
    return (this as any) as AppEthereumApi;
  }

  private ethereumIsReady = async () => {
    await this.injected.enable();
  };

  private laminarIsReady = async () => {
    const anyWindow = window as any;

    this.injected = await anyWindow.injectedWeb3['polkadot-js'].enable('FLOW EXCHANGE');

    (this.apiProvider as LaminarApi).api.setSigner(this.injected.signer);
  };

  public isReady = async () => {
    if (this.chainType === 'ethereum') {
      await Promise.all([this.ethereumIsReady(), this.apiProvider.isReady()]);
    } else if (this.chainType === 'laminar') {
      await Promise.all([this.laminarIsReady(), this.apiProvider.isReady()]);
    }
  };

  public getAccounts = async (): Promise<Account[]> => {
    if (this.chainType === 'ethereum') {
      return (await this.injected.enable()).map(
        (s: any) =>
          ({
            address: s,
            name: s.slice(12),
          } as Account),
      );
    } else if (this.chainType === 'laminar') {
      return (await this.injected.accounts.get()).map(
        ({ address, name }: any) =>
          ({
            address,
            name,
          } as Account),
      );
    } else {
      throw new Error('not expect');
    }
  };

  public emit = (type: string, ...args: any[]): boolean => this._eventemitter.emit(type, ...args);

  public on = (type: string, handler: (...args: any[]) => any): this => {
    this._eventemitter.on(type, handler);
    return this;
  };

  public off = (type: string, handler: (...args: any[]) => any): this => {
    this._eventemitter.removeListener(type, handler);
    return this;
  };

  public once = (type: string, handler: (...args: any[]) => any): this => {
    this._eventemitter.once(type, handler);
    return this;
  };
}

export default Api;
