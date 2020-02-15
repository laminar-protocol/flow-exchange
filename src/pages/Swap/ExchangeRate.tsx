import React from 'react';

import { NumberFormat, Spinner, Text } from '../../components';
import { Token } from '../../types';
import { caculateExchangeRate } from '../../utils';

export interface ExchangeRateProps {
  spread?: number;
  rate?: number;
  isLoading: boolean;
  fromToken: Token;
  toToken: Token;
}

const ExchangeRate: React.FC<ExchangeRateProps> = ({ spread, rate, isLoading, fromToken, toToken }) => {
  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  if (spread === undefined || rate === undefined) {
    return null;
  }

  const value = caculateExchangeRate(1, spread, rate, 'bid');

  return (
    <Text light>
      <strong>1</strong>
      &nbsp;{fromToken.name}
      &nbsp;≈&nbsp;
      <strong>
        <NumberFormat value={value} noPrefix />
      </strong>
      &nbsp;{toToken.name}
    </Text>
  );
};

export default ExchangeRate;
