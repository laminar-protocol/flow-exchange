import React from 'react';
import styled from 'styled-components';

import { Panel, Separator, Text } from '../../components';
import { useApp } from '../../hooks';
import { theme } from '../../styles';
import BalanceLine from './BalanceLine';

export const Container = styled(Panel)`
  margin-right: 2rem;
  width: 30%;
  ${theme.respondTo.lg`
    width: 100%;
    margin-right: 0;
    margin-bottom: 2rem;
  `};
`;

const SwapBalances: React.FC = () => {
  const tokens = useApp(state => state.tokens);

  return (
    <Container>
      <Text size="l">Balances</Text>
      <Separator size={1} />
      {tokens?.map(token => (
        <BalanceLine token={token} key={token.name} />
      ))}
    </Container>
  );
};

export default SwapBalances;
