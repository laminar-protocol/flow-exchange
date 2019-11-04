import ethereum from 'services/ethereum';

import { actions } from 'types';
import { createEpic } from 'helpers/apiLoadable';
import { Epic } from 'reducers';
import { fromWei } from 'helpers/unitHelper';

export const spread: Epic = createEpic(
  actions.liquidityPool.spread,
  async ([poolAddr, tokenAddr]) => {
    const contract = ethereum.getLiquidityPoolContract(poolAddr);
    const bid = await contract.methods.getBidSpread(tokenAddr).call();
    const ask = await contract.methods.getAskSpread(tokenAddr).call();
    return {
      ask: Number(fromWei(ask)),
      bid: Number(fromWei(bid)),
    };
  },
);
