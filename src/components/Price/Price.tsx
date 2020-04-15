import React from 'react';

import { BaseProps } from '../../types';
import { fromPrecision } from '../../utils';

type PriceProps = {
  base: {
    timestamp: number;
    value: string;
  } | null;
  quote: {
    timestamp: number;
    value: string;
  } | null;
  spread: number;
  direction: 'ask' | 'bid';
};

const Price: React.FC<BaseProps & PriceProps> = ({
  component: Component = 'span',
  base,
  quote,
  spread,
  direction,
  ...other
}) => {
  let value: string;
  if (!base || !quote) {
    value = '-';
  } else {
    value = (
      ((direction === 'ask' ? 1 + spread : 1 - spread) * Number(fromPrecision(base.value, 18))) /
      Number(fromPrecision(quote.value, 18))
    ).toFixed(5);
  }
  return <Component {...other}>{value}</Component>;
};

export default Price;
