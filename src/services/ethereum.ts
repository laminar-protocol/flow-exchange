import { mapObjIndexed } from 'ramda';
import Web3 from 'web3';

import { abi, addresses, tradingPairs } from 'config';

// workaround to get types that are not exposed directly from web3
type Eth = Web3['eth'];
type Contract = InstanceType<Eth['Contract']>;

// TODO: this need some refactor
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
    const eurContract = new this.web3.eth.Contract(abi.ERC20, addresses.fEUR);
    const jpyContract = new this.web3.eth.Contract(abi.ERC20, addresses.fJPY);
    const appleContract = new this.web3.eth.Contract(abi.ERC20, addresses.fAAPL);
    const xauContract = new this.web3.eth.Contract(abi.ERC20, addresses.fXAU);

    this.tokens = {
      DAI: daiContract,
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

const ethereum = new Ethereum();

export default ethereum;
