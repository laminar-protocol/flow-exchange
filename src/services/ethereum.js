import Web3 from 'web3';

import ERC20ABI from 'abi/erc20.json';
import FLOWABI from 'abi/flow.json';

class Ethereum {
  constructor() {
    this.ethWeb3 = window.ethereum;
    this.ethProvider = new Web3(window.ethereum);
  }

  prepareContract(addresses) {
    this.addresses = addresses;
    if (this.addresses !== null) {
      this.daiContract = new this.ethProvider.eth.Contract(ERC20ABI, this.addresses.dai);
      this.flowContract = new this.ethProvider.eth.Contract(FLOWABI, this.addresses.flow);
    } else {
      this.daiContract = null;
      this.flowContract = null;
    }
  }
}

const ethereum = new Ethereum();
export default ethereum;
