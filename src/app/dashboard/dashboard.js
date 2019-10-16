import React from 'react';
import styled from 'styled-components';
import {
  Text, Separator,
} from 'components';

import Balance from './balance.connect';
import Grant from './grant.connect';

const Container = styled.div`
`;

const DaiStatus = styled.div`
  display: flex;
  & > div {
    margin-right: 1rem;
    width: 20rem;
  }
`;

const Component = () => (
  <Container>
    <Text size="h">Dashboard</Text>
    <Separator />
    <DaiStatus>
      <Balance />
      <Grant />
    </DaiStatus>
  </Container>
);

export default Component;
