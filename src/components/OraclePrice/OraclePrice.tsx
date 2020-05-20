import React from 'react';

import { useOraclePrice } from '../../hooks';
import { TokenId } from '../../services/Api';
import { BaseProps } from '../../types';
import { toFixed } from '../../utils';

type OraclePriceProps = {
  baseTokenId: TokenId;
  quoteTokenId: TokenId;
  spread?: string;
  direction: 'long' | 'short';
  render?: (value: number) => React.ReactNode;
};

const OraclePrice: React.FC<BaseProps & OraclePriceProps> = ({
  component: Component = 'span',
  baseTokenId,
  quoteTokenId,
  spread,
  direction,
  render = (x: number) => toFixed(x, 5),
  ...other
}) => {
  const price = useOraclePrice(baseTokenId, quoteTokenId, spread, direction);

  if (!price) return null;

  return <Component {...other}>{render(price)}</Component>;
};

export default OraclePrice;
