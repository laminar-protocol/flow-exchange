import React, { useEffect, useState } from 'react';

import { Amount, Text, TextCell } from '../../components';
import { useAccount, useApp } from '../../hooks';
import { TokenInfo } from '../../services/Api';
import { getTokenIcon } from '../../utils';

export type BalanceProps = {
  token: TokenInfo;
  label?: string;
};

export type StateProps = {
  balance: string;
  isQueryingBalance: boolean;
};

const Balance: React.FC<BalanceProps> = ({ token, label }) => {
  const api = useApp(state => state.api);
  const currentAccount = useApp(state => state.currentAccount);
  const balance = useAccount(state => state.balances[token.name]);
  const setBalance = useAccount(state => state.setBalance);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentAccount && api) {
      setLoading(true);
      api
        .getBalance(currentAccount.address, token.id)
        .then(result => {
          setBalance(token.name, result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [api, token, setBalance, currentAccount]);

  return (
    <TextCell header={label || `${token.name} Balance`} accessory={getTokenIcon(token.id)} loading={loading}>
      <Text weight="bold" size="l">
        {balance ? <Amount value={balance} token={token} hasPrefix /> : '-'}
      </Text>
    </TextCell>
  );
};

export default Balance;
