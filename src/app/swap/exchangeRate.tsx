import React from 'react';
import { NumberFormat, Spinner, Text } from '../../components';
import { tokens } from '../../config';
import { caculate } from '../../helpers/exchangeRateHelper';

const symbolName = (symbol: TokenSymbol) => tokens[symbol].name;

// ----------
// Interface
// ----------
export interface StateProps {
  spread?: number;
  rate?: number;
  isLoading: boolean;
  fromSymbol: TokenSymbol;
  toSymbol: TokenSymbol;
}

// ----------

const ExchangeRate: React.FC<StateProps> = ({ spread, rate, isLoading, fromSymbol, toSymbol }) => {
  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  if (!spread || !rate) {
    return null;
  }
  const value = caculate(1, spread, rate, 'bid');

  return (
    <Text light>
      <strong>1</strong>
      &nbsp;{symbolName(fromSymbol)}
      &nbsp;≈&nbsp;
      <strong>
        <NumberFormat value={value} noPrefix />
      </strong>
      &nbsp;{symbolName(toSymbol)}
    </Text>
  );
};

export default ExchangeRate;
