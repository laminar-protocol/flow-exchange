import React from 'react';
import styled from 'styled-components';

import { Amount, Text } from '../../components';
import { useAccount } from '../../store/useAccount';
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
  loading?: boolean;
}

const BalanceLine: React.FC<Props> = ({ token, lite, loading = false }) => {
  const balance = useAccount(state => state.balances[token.id]);

  if (!balance) return null;

  if (lite) {
    return (
      <Text weight="bold">{loading || !balance ? '—' : <Amount value={balance} tokenId={token.id} hasPrefix />}</Text>
    );
  }

  return (
    <Container>
      <div>
        <Text>{token.displayName}</Text>
      </div>
      <div>
        <Text weight="bold">{loading || !balance ? '—' : <Amount value={balance} tokenId={token.id} hasPrefix />}</Text>
      </div>
    </Container>
  );
};

export default BalanceLine;
