import React from 'react';
import styled from 'styled-components';
import {
  Text, Separator,
} from 'components';

import Balance from './balance.connect';
import Grant from './grant.connect';
import Faucet from './faucet.connect';

const Container = styled.div`
`;

const TokenStatus = styled.div`
  display: flex;
  margin-bottom: 1rem;
  & > div {
    margin-right: 1rem;
    width: 20rem;
  }
`;

const Component = () => (
  <Container>
    <Text size="h">Dashboard</Text>
    <Separator />
    <TokenStatus>
      <Balance symbol="DAI" />
      <Grant />
    </TokenStatus>
    <TokenStatus>
      <Balance symbol="fEUR" />
    </TokenStatus>
    <TokenStatus>
      <Balance symbol="fJPY" />
    </TokenStatus>
    <TokenStatus>
      <Faucet symbol="DAI" amount="100" />
    </TokenStatus>
  </Container>
);

export default Component;
