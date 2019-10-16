import React, { useEffect } from 'react';
import {
  Text, TextCell, NumberFormat,
} from 'components';
import { fromWei } from 'helpers/unitHelper';

const Component = ({ dai, onDaiBalanceQuery }) => {
  const {
    balance,
    isQueryingBalance,
  } = dai;

  useEffect(() => {
    onDaiBalanceQuery();
  }, [onDaiBalanceQuery]);

  return (
    <TextCell header="Balance" accessory="dollar-sign" loading={isQueryingBalance}>
      <Text weight="bold" size="l">
        <NumberFormat value={fromWei(balance)} />
      </Text>
    </TextCell>
  );
};

export default Component;
