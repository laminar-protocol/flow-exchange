import React, { useMemo } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

import { Spinner, Text } from '../../components';
import { AppState } from '../../reducers';
import { useShallowEqualSelector } from '../../hooks';
import SwapItem from './swapItem';

// ----------
// GQL
// ----------
const listQuery = gql`
  subscription eventEntities($user: Bytes!) {
    eventEntities(first: 20, orderBy: timestamp, orderDirection: desc, where: { user: $user }) {
      id
      kind
      timestamp
      txhash
      block
      user
      token {
        name
        symbol
        id
      }
      liquidityPool
      baseTokenAmount
      flowTokenAmount
    }
  }
`;

// ----------
// Styles
// ----------
const CenterContainer = styled.div`
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div``;

// ----------
// Interface
// ----------

export interface StateProps {
  account?: string;
}

// ----------

const SwapList: React.FC = () => {
  const account = useShallowEqualSelector<AppState, StateProps>(({ ethereum: { account } }: AppState) => ({
    account,
  }));

  const { loading: isLoading, data } = useSubscription(listQuery, {
    variables: {
      user: account,
    },
  });

  const positions = useMemo(() => data?.eventEntities.map((event: any) => ({ ...event })), [data]);

  if (isLoading) {
    return (
      <CenterContainer>
        <Spinner />
      </CenterContainer>
    );
  }

  if (!positions || (positions as Array<any>).length <= 0) {
    return (
      <CenterContainer>
        <Text light size="l">
          No Transaction
        </Text>
      </CenterContainer>
    );
  }
  return (
    <Container>
      {positions.map((position: any) => (
        <SwapItem
          tx={position.txhash}
          key={position.id}
          kind={position.kind}
          baseTokenAmount={position.baseTokenAmount}
          flowTokenAmount={position.flowTokenAmount}
          timestamp={position.timestamp}
          symbol={position.token.symbol}
        />
      ))}
    </Container>
  );
};

export default SwapList;
