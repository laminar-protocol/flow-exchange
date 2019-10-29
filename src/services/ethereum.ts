import Web3 from 'web3';

import { abi, Addresses } from 'config';

// workaround to get types that are not exposed directly from web3
type Eth = Web3['eth'];
type Contract = InstanceType<Eth['Contract']>;

// TODO: this need some refactor
class Ethereum {
  public readonly ethWeb3: any;
  public readonly ethProvider: Web3;

  private _flowProtocol?: Contract;
  private _flowMarginProtocol?: Contract;

  private _oracle?: Contract;
  private _moneyMarket?: Contract;

  private _liquidityPool?: Contract;

  public readonly ready: Promise<void>;
  private _resolveReady = () => {};

  private _tokens?: {
    DAI: Contract;
    fEUR: Contract;
    fJPY: Contract;
  }

  constructor() {
    const anyWindow = window as any;
    if (typeof anyWindow.ethereum !== 'undefined' || (typeof anyWindow.web3 !== 'undefined')) {
      const provider = anyWindow.ethereum || anyWindow.web3.currentProvider;

      this.ethWeb3 = provider;
      this.ethProvider = new Web3(this.ethWeb3);

      provider.autoRefreshOnNetworkChange = false;

      // eslint-disable-next-line no-restricted-globals
      provider.on('networkChanged', () => location.reload());
    } else {
      // TODO: handle this
      throw new Error('Not supported');
    }

    this.ready = new Promise((resolve) => {
      this._resolveReady = resolve;
    });
  }

  prepareBaseContract(addresses: Addresses) {
    this._flowProtocol = new this.ethProvider.eth.Contract(abi.FlowProtocol, addresses.protocol);
    this._flowMarginProtocol = new this.ethProvider.eth.Contract(abi.FlowMarginProtocol, addresses.marginProtocol);

    this._oracle = new this.ethProvider.eth.Contract(abi.PriceOracleInterface, addresses.oracle);
    this._moneyMarket = new this.ethProvider.eth.Contract(abi.MoneyMarket, addresses.moneyMarket);

    this._liquidityPool = new this.ethProvider.eth.Contract(abi.LiquidityPoolInterface, addresses.pool);

    const daiContract = new this.ethProvider.eth.Contract(abi.ERC20, addresses.baseToken);
    const eurContract = new this.ethProvider.eth.Contract(abi.ERC20, addresses.fEUR);
    const jpyContract = new this.ethProvider.eth.Contract(abi.ERC20, addresses.fJPY);

    this._tokens = {
      DAI: daiContract,
      fEUR: eurContract,
      fJPY: jpyContract,
    };

    this._resolveReady();
  }

  getTokenContract(symbol: string) {
    return ((this._tokens as any)[symbol] || (this._tokens as any)[`f${symbol}`]) as Contract;
  }

  get flowContract() {
    return this._flowProtocol as Contract;
  }

  get poolContract() {
    return this._liquidityPool as Contract;
  }

  get oracleContract() {
    return this._oracle as Contract;
  }

  get moneyMarketContract() {
    return this._moneyMarket as Contract;
  }

  get flowMarginProtocol() {
    return this._flowMarginProtocol as Contract;
  }

  get baseTokenContract() {
    return (this._tokens as any).DAI as Contract;
  }
}

const ethereum = new Ethereum();
export default ethereum;
