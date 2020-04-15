import BN from 'bn.js';

import { fromPrecision, toPrecision } from './precision';

const calcTokenLiquidity = (base: BN | number | string, additionalCollateralRatio: number): string => {
  const liquidity = fromPrecision(base, 18);

  return toPrecision(Number(liquidity as any) * (1 + additionalCollateralRatio), 18).toString();
};

export default calcTokenLiquidity;
