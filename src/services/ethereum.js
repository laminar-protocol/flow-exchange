import Web3 from 'web3';

import { abi } from 'config';

class Ethereum {
  constructor() {
    this.ethWeb3 = window.ethereum;
    this.ethProvider = new Web3(window.ethereum);
  }

  prepareBaseContract(addresses) {
    if (addresses !== null) {
      this.flowContract = new this.ethProvider.eth.Contract(abi.FlowProtocol, addresses.protocol);
      this.poolContract = new this.ethProvider.eth.Contract(abi.LiquidityPoolInterface, addresses.pool);
    } else {
      this.flowContract = null;
      this.poolContract = null;
    }
  }

  prepareTokenContract(addresses) {
    if (addresses !== null) {
      this.daiContract = new this.ethProvider.eth.Contract(abi.ERC20, addresses.baseToken);
      this.eurContract = new this.ethProvider.eth.Contract(abi.ERC20, addresses.fEUR);
      this.jpyContract = new this.ethProvider.eth.Contract(abi.ERC20, addresses.fJPY);

      this.tokenContracts = {
        DAI: this.daiContract,
        fEUR: this.eurContract,
        fJPY: this.jpyContract,
      };
    } else {
      this.daiContract = null;
      this.eurContract = null;
      this.jpyContract = null;
      this.tokenContracts = null;
    }
  }

  prepareOracleContract(address) {
    if (address) {
      this.oracleContract = new this.ethProvider.eth.Contract(abi.PriceOracleInterface, address);
    } else {
      this.oracleContract = null;
    }
  }

  prepareMoneyMarketContract(address) {
    if (address) {
      this.moneyMarketContract = new this.ethProvider.eth.Contract(abi.MoneyMarket, address);
    } else {
      this.moneyMarketContract = null;
    }
  }

  getTokenContract(symbol) {
    return this.tokenContracts[symbol];
  }
}

const ethereum = new Ethereum();
export default ethereum;
