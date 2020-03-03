import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Amount, Text } from '../../components';
import { useAccount, useApp } from '../../hooks';
import { TokenInfo } from '../../services/Api';

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export interface Props {
  token: TokenInfo;
  lite?: boolean;
}

const BalanceLine: React.FC<Props> = ({ token, lite }) => {
  const [loading, setLoading] = useState(false);
  const api = useApp(state => state.api);
  const currentAccount = useApp(state => state.currentAccount);
  const balance = useAccount(state => state.balances[token.name]);
  const setBalance = useAccount(state => state.setBalance);

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

  if (lite) {
    return <Text weight="bold">{loading || !balance ? '—' : <Amount value={balance} token={token} hasPrefix />}</Text>;
  }

  return (
    <Container>
      <div>
        <Text>{token.displayName}</Text>
      </div>
      <div>
        <Text weight="bold">{loading || !balance ? '—' : <Amount value={balance} token={token} hasPrefix />}</Text>
      </div>
    </Container>
  );
};

export default BalanceLine;
