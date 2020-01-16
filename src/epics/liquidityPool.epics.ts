import BN from 'bn.js';

import ethereum from '../services/ethereum';
import { actions } from '../types';
import { Epic } from '../reducers';
import { createEpic } from '../helpers/apiLoadable';
import { fromWei } from '../helpers/unitHelper';
import { addresses } from '../config';

export const spread: Epic = createEpic(actions.liquidityPool.spread, async ([poolAddr, tokenAddr]) => {
  const contract = ethereum.getLiquidityPoolContract(poolAddr);

  const [ask, bid] = await Promise.all([
    contract.methods.getAskSpread(tokenAddr).call(),
    contract.methods.getBidSpread(tokenAddr).call(),
  ]);

  return {
    ask: Number(fromWei(ask)),
    bid: Number(fromWei(bid)),
  };
});

export const available: Epic = createEpic(actions.liquidityPool.available, async poolAddr => {
  const contract = ethereum.getLiquidityPoolContract(poolAddr);

  const [ratio, amount] = await Promise.all<number, string>([
    contract.methods.getAdditionalCollateralRatio(addresses.iToken).call(),
    ethereum.tokens.iUSD.methods.balanceOf(poolAddr).call(),
  ]);

  return fromWei(new BN(amount).mul(new BN(ratio + 1)));
});

export const allowed_tokens: Epic = createEpic(actions.liquidityPool.allowed_tokens, async poolAddr => {
  const contract = ethereum.getLiquidityPoolContract(poolAddr);

  return ['XAU', 'EUR']; // TODO: call contract
  const allowed_tokens = await contract.methods.getAllowedTokens().call();

  return allowed_tokens;
});
