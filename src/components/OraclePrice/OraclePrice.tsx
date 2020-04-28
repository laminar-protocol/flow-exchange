import React from 'react';

import { useOraclePrice } from '../../selectors';
import { TokenId } from '../../services/Api';
import { BaseProps } from '../../types';

type OraclePriceProps = {
  baseTokenId: TokenId;
  quoteTokenId: TokenId;
  spread?: number;
  direction: 'ask' | 'bid';
  calc?: (value: number) => number;
};

const OraclePrice: React.FC<BaseProps & OraclePriceProps> = ({
  component: Component = 'span',
  baseTokenId,
  quoteTokenId,
  spread,
  direction,
  calc = (x: number) => x,
  ...other
}) => {
  const price = useOraclePrice(baseTokenId, quoteTokenId, spread || null, direction);

  if (!price) return null;

  return <Component {...other}>{calc(price).toFixed(5)}</Component>;
};

export default OraclePrice;
