import Web3 from 'web3';

const web3 = {
  web3: window.ethereum,
  provider: new Web3(window.ethereum),
};

export default web3;
