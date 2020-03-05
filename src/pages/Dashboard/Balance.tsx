import React, { useEffect, useState } from 'react';

import { Amount, Text, TextCell } from '../../components';
import { useAccount } from '../../hooks/useAccount';
import { TokenInfo } from '../../services/Api';
import { getTokenIcon } from '../../utils';

export type BalanceProps = {
  token: TokenInfo;
  label?: string;
  loading?: boolean;
};

const Balance: React.FC<BalanceProps> = ({ token, label, loading = false }) => {
  const balance = useAccount(state => state.balances[token.id]);

  if (!balance) return null;

  return (
    <TextCell header={label || `${token.name} Balance`} accessory={getTokenIcon(token.id)} loading={loading}>
      <Text weight="bold" size="l">
        {balance ? <Amount value={balance} token={token} hasPrefix /> : '-'}
      </Text>
    </TextCell>
  );
};

export default Balance;
