import BN from 'bn.js';
import _ from 'lodash';
import ethereum from 'services/ethereum';
import { actions } from 'types';
import { Epic } from 'reducers';
import { createEpic } from 'helpers/apiLoadable';
import { fromWei } from 'helpers/unitHelper';
import { addresses, tokens } from 'config';

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

export const liquidity: Epic = createEpic(actions.liquidityPool.liquidity, async poolAddr => {
  const contract = ethereum.getLiquidityPoolContract(poolAddr);

  const [ratio, amount] = await Promise.all<number, string>([
    contract.methods.getAdditionalCollateralRatio(addresses.iToken).call(),
    ethereum.tokens.iUSD.methods.balanceOf(poolAddr).call(),
  ]);

  return fromWei(new BN(amount).mul(new BN(ratio + 1)));
});

export const allowedTokens: Epic = createEpic(actions.liquidityPool.allowedTokens, async poolAddr => {
  const contract = ethereum.getLiquidityPoolContract(poolAddr);

  // TODO: update this when contract provides a list of allowed tokens
  const baseTokens = Object.values(tokens).filter(i => i.isBaseToken === false);
  const spreads = await Promise.all(baseTokens.map(token => contract.methods.getBidSpread(token.address).call()));
  return _.zip(baseTokens, spreads)
    .filter(([, spread]) => spread !== 0)
    .map(([token]) => (token as { name: string }).name);
});
