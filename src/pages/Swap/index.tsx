import React from 'react';
import styled from 'styled-components';
import * as theme from 'theme';

import { Separator, Text } from '../../components';
import Exchange from './Exchange';
import SwapBalances from './SwapBalances';
import SwapList from './SwapList';

const Swap: React.FC = () => {
  return (
    <Container>
      <Text size="h">Spot Exchange</Text>
      <Separator />
      <Exchange />
      <div className="swap-detail">
        <SwapBalances />
        <SwapList />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .swap-detail {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    ${theme.respondTo.lg`
    flex-direction: column;
  `};
  }
`;

export default Swap;
