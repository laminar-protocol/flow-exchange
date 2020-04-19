import React from 'react';

import { BaseProps } from '../../types';
import { fromPrecision } from '../../utils';
import { TokenId } from '../../services/Api';
import { useOraclePriceSelector } from '../../selectors';

type OraclePriceProps = {
  baseTokenId: TokenId;
  quoteTokenId: TokenId;
  spread: number;
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
  const price = useOraclePriceSelector(baseTokenId, quoteTokenId, spread, direction);

  if (!price) return null;

  return <Component {...other}>{calc(price).toFixed(5)}</Component>;
};

export default OraclePrice;
