import React, { useEffect } from 'react';

import {
  Text, TextCell, NumberFormat,
} from 'components';
import { fromWei } from 'helpers/unitHelper';
import { State, getBalance, getIsQueryingBalance } from 'reducers/token.reducer';

interface Props {
  token: State;
  onBalanceQuery: (symbol: string) => void;
}

const Balance: React.FC<Props> = ({ token, onBalanceQuery }) => {
  const balance = getBalance('DAI', token);
  const isQueryingBalance = getIsQueryingBalance('DAI', token);

  useEffect(() => {
    onBalanceQuery('DAI');
  }, [onBalanceQuery]);

  return (
    <TextCell header="Balance" accessory="dollar-sign" loading={isQueryingBalance}>
      <Text weight="bold" size="l">
        <NumberFormat value={fromWei(balance)} />
      </Text>
    </TextCell>
  );
};

export default Balance;
