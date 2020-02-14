import React, { useEffect, useState } from 'react';

import { Amount, Text, TextCell } from '../../components';
import { useApp, useTokens } from '../../hooks';
import { Token } from '../../services/types';

export type BalanceProps = {
  token: Token;
  label?: string;
};

export type StateProps = {
  balance: string;
  isQueryingBalance: boolean;
};

const Balance: React.FC<BalanceProps> = ({ token, label }) => {
  const api = useApp(state => state.provider && state.provider.api);
  const currentAccount = useApp(state => state.currentAccount);
  const balance = useTokens(state => state.currentBalances[token.name]);
  const setBalance = useTokens(state => state.setCurrentBalance);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentAccount && api) {
      setLoading(true);
      api
        .getBalance(currentAccount.address, token.name)
        .then(result => {
          setBalance(token.name, result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [api, token, setBalance, currentAccount]);

  return (
    <TextCell header={label || `${token.name} Balance`} accessory={token.icon} loading={loading}>
      <Text weight="bold" size="l">
        {balance ? <Amount value={balance} token={token} hasPrefix /> : '-'}
      </Text>
    </TextCell>
  );
};

export default Balance;
