import React from 'react';
import styled from 'styled-components';

import { Flex, Panel, Separator, Text } from '../../components';
import { useTokens } from '../../hooks';
import * as theme from '../../theme';
import Balance from './Balance';
import Faucet from './Faucet';

const Balances: React.FC = () => {
  const tokens = useTokens(state => state.currentTokens);

  return (
    <Container>
      <Text size="l">Balances</Text>
      <Separator size={1} />
      {tokens?.map(token => {
        if (token.name === 'DAI') {
          return (
            <div className="item" key="DAI">
              <Flex>
                <Balance token={token} />
                <Faucet symbol="DAI" amount="100" />
              </Flex>
            </div>
          );
        }
        return (
          <div className="item" key={token.name}>
            <Balance token={token} />
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled(Panel)`
  width: 35%;
  ${theme.respondTo.lg`
    width: 100%;
  `}

  div:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .item {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid ${theme.borderColor};
    padding-bottom: 1.5rem;
  }
`;

export default Balances;
