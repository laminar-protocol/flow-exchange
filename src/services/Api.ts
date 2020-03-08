import { ChainType, EthereumApi, FlowApi, LaminarApi, WsProvider } from '@laminar/api';
import EventEmitter from 'eventemitter3';

export * from '@laminar/api';

export interface Account {
  name: string;
  address: string;
}

class Api implements FlowApi {
  private injected: any;
  private provider: EthereumApi | LaminarApi;
  private _eventemitter = new EventEmitter();

  public chainType: FlowApi['chainType'];
  public getBalance: FlowApi['getBalance'];
  public getPoolOptions: FlowApi['getPoolOptions'];
  public getLiquidity: FlowApi['getLiquidity'];
  public redeem: FlowApi['redeem'];
  public mint: FlowApi['mint'];
  public getOraclePrice: FlowApi['getOraclePrice'];
  public getDefaultPools: FlowApi['getDefaultPools'];
  public getTokens: FlowApi['getTokens'];
  public getTradingPairs: FlowApi['getTradingPairs'];
  public withdrawLiquidity: FlowApi['withdrawLiquidity'];
  public depositLiquidity: FlowApi['depositLiquidity'];
  public getPoolAddress: FlowApi['getPoolAddress'];
  public createPool: FlowApi['createPool'];

  constructor({ chainType }: { chainType?: ChainType } = {}) {
    const anyWindow = window as any;

    if (chainType === 'ethereum') {
      if (!anyWindow.ethereum && !anyWindow.web3) throw new Error('metamask not detect');
      this.injected = anyWindow.ethereum || anyWindow.web3.currentProvider;
      this.provider = new EthereumApi({
        provider: this.injected,
      });
    } else if (chainType === 'laminar') {
      if (!anyWindow.injectedWeb3['polkadot-js']) throw new Error('polkadot extensions not detect');

      this.provider = new LaminarApi({
        provider: new WsProvider('wss://testnet-node-1.laminar-chain.laminar.one/ws'),
      });
    } else {
      throw new Error('chainType is either ethereum or laminar');
    }

    this.chainType = this.provider.chainType;
    this.getBalance = this.provider.getBalance;
    this.getPoolOptions = this.provider.getPoolOptions;
    this.getLiquidity = this.provider.getLiquidity;
    this.redeem = this.provider.redeem;
    this.mint = this.provider.mint;
    this.getOraclePrice = this.provider.getOraclePrice;
    this.getDefaultPools = this.provider.getDefaultPools;
    this.getTokens = this.provider.getTokens;
    this.getTradingPairs = this.provider.getTradingPairs;
    this.withdrawLiquidity = this.provider.withdrawLiquidity;
    this.depositLiquidity = this.provider.depositLiquidity;
    this.getPoolAddress = this.provider.getPoolAddress;
    this.createPool = this.provider.createPool;
  }

  private ethereumIsReady = async () => {
    await this.injected.enable();
  };

  private laminarIsReady = async () => {
    const anyWindow = window as any;

    this.injected = await anyWindow.injectedWeb3['polkadot-js'].enable('FLOW EXCHANGE');

    (this.provider as LaminarApi).api.setSigner(this.injected.signer);
  };

  public isReady = async () => {
    if (this.chainType === 'ethereum') {
      await Promise.all([this.ethereumIsReady(), this.provider.isReady()]);
    } else if (this.chainType === 'laminar') {
      await Promise.all([this.laminarIsReady(), this.provider.isReady()]);
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
