import React from 'react';
import { useOraclePrice } from '../../hooks';
import { TokenId } from '../../services/Api';
import { BaseProps } from '../../types';
import { toFixed } from '../../utils';
import { PriceStatus } from '../PriceStatus';

type OraclePriceProps = {
  baseTokenId: TokenId;
  quoteTokenId: TokenId;
  spread?: string;
  direction: 'long' | 'short';
  render?: (value: number) => React.ReactNode;
};

const defaultRender = (x: number) => toFixed(x, 5);

const OraclePrice: React.FC<BaseProps & OraclePriceProps> = ({
  component: Component = PriceStatus,
  baseTokenId,
  quoteTokenId,
  spread,
  direction,
  render = defaultRender,
  ...other
}) => {
  const { value: price, timestamp } = useOraclePrice(baseTokenId, quoteTokenId, spread, direction) || {};

  if (!price) return null;

  const showValue = render(price);

  return (
    <Component timestamp={timestamp} value={showValue} {...other}>
      {showValue}
    </Component>
  );
};

export default OraclePrice;
