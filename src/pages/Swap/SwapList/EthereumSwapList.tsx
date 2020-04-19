import { useSubscription } from '@apollo/react-hooks';
import clsx from 'clsx';
import gql from 'graphql-tag';
import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';

import { Panel, Spinner, Text } from '../../../components';
import { useApp } from '../../../store';
import SwapItem from './SwapListItem';

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
  const classes = useStyles();

  const { loading: isLoading, data } = useSubscription(listQuery, {
    variables: {
      user: account?.address,
    },
  });

  const positions = useMemo(() => data?.eventEntities.map((event: any) => ({ ...event })), [data]);

  if (isLoading) {
    return (
      <Panel className="is-center">
        <Spinner />
      </Panel>
    );
  }

  if (!positions || (positions as Array<any>).length <= 0) {
    return (
      <Panel className={clsx(classes.root, classes.isCenter)}>
        <Text light size="l">
          No Transaction
        </Text>
      </Panel>
    );
  }

  return (
    <Panel className={clsx(classes.root, classes.isCenter)}>
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
    </Panel>
  );
};

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  isCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SwapList;
