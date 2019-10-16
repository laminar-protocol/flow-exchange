import Web3 from 'web3';
import { contractAddress } from 'config';

import ERC20ABI from 'abi/erc20.json';

class Ethereum {
  constructor() {
    this.ethWeb3 = window.ethereum;
    this.ethProvider = new Web3(window.ethereum);
  }

  prepareContract(network) {
    this.addresses = contractAddress[network];
    if (this.addresses !== null) {
      this.daiContract = new this.ethProvider.eth.Contract(ERC20ABI, this.addresses.dai);
    } else {
      this.daiContract = null;
    }
  }
}

const ethereum = new Ethereum();
export default ethereum;
