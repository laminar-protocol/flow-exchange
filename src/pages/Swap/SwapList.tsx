import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Panel, Spinner, Text } from '../../components';
import { useApp } from '../../hooks';
import SwapItem from './SwapListItem';

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

const SwapList: React.FC = () => {
  const account = useApp(state => state.currentAccount);

  const { loading: isLoading, data } = useSubscription(listQuery, {
    variables: {
      user: account?.address,
    },
  });

  const positions = useMemo(() => data?.eventEntities.map((event: any) => ({ ...event })), [data]);

  if (isLoading) {
    return (
      <Container className="is-center">
        <Spinner />
      </Container>
    );
  }

  if (!positions || (positions as Array<any>).length <= 0) {
    return (
      <Container className="is-center">
        <Text light size="l">
          No Transaction
        </Text>
      </Container>
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

const Container = styled(Panel)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;
  &.is-center {
    align-items: center;
    justify-content: center;
  }
`;

export default SwapList;
