import React, { useEffect } from 'react';

import {
  Text, TextCell, NumberFormat,
} from 'components';
import { fromWei } from 'helpers/unitHelper';
import { State, getBalance, getIsQueryingBalance } from 'reducers/token.reducer';

interface OwnProps {
  symbol: string;
}

interface Props extends OwnProps {
  token: State;
  onBalanceQuery: (symbol: string) => void;
}

const Balance: React.FC<Props> = ({ symbol, token, onBalanceQuery }) => {
  const balance = getBalance(symbol, token);
  const isQueryingBalance = getIsQueryingBalance(symbol, token);

  useEffect(() => {
    onBalanceQuery(symbol);
  }, [onBalanceQuery, symbol]);

  return (
    <TextCell header={`${symbol} Balance`} accessory="dollar-sign" loading={isQueryingBalance}>
      <Text weight="bold" size="l">
        <NumberFormat value={fromWei(balance)} />
      </Text>
    </TextCell>
  );
};

export default Balance;
