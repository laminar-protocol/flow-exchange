import React, { useEffect } from 'react';

import {
  Text, TextCell, NumberFormat,
} from 'components';
import { fromWei } from 'helpers/unitHelper';
import { getBalance, getIsQueryingBalance } from 'reducers/token.reducer';

const Component = ({ token, onBalanceQuery }) => {
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

export default Component;
