import Web3 from 'web3';

import Ethereum from '../../Ethereum';

describe('ethereum', () => {
  const poolAddr = '0x8b205c597602ebf442857D4714d996B343fFa20c';
  const tokenAddr = '0x99D46D56b4f17BeFbE95673161aBDa45a0c29bf8';
  let ethereum: any;
  jest.setTimeout(30000);

  beforeAll(() => {
    ethereum = new Ethereum();
    // set kovan provider
    ethereum.web3.setProvider(
      new Web3.providers.HttpProvider('https://kovan.infura.io/v3/16a5aa3a08c24d56b1586cd06b4055d5'),
    );
  });

  xit('should get bid spread and ask spread', async () => {
    const contract = ethereum.getLiquidityPoolContract(poolAddr);
    const bid = await contract.methods.getBidSpread(tokenAddr).call();
    const ask = await contract.methods.getAskSpread(tokenAddr).call();

    console.log(`bid spread: ${bid}; ask spread: ${ask}`);

    expect(bid).toBeDefined();
    expect(ask).toBeDefined();
  });

  xit('get erc20 balance', async () => {
    const balance = await ethereum.tokens.iUSD.methods.balanceOf(poolAddr).call();
    console.log(`${poolAddr} balance: ${balance}`);
    expect(balance).toBeDefined();
  });
});
