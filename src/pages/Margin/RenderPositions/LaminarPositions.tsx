import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useLayoutEffect } from 'react';
import { useCurrentAccount, useGetTokenInfo } from '../../../hooks';
import { getLeverage, getValueFromHex } from '../../../utils';
import useMargin from '../hooks/useMargin';
import Swap from './Swap';
import Pl from './Pl';

const positionsOpenQuery = gql`
  subscription positionsSubscription($signer: String!) {
    Extrinsics(
      where: {
        section: { _eq: "marginProtocol" }
        method: { _eq: "openPosition" }
        result: { _eq: "ExtrinsicSuccess" }
        signer: { _eq: $signer }
      }
      order_by: { blockNumber: desc }
    ) {
      args
      events(order_by: { phaseIndex: asc }, where: { method: { _eq: "PositionOpened" } }, limit: 1) {
        args
      }
      block {
        timestamp
      }
      hash
    }
  }
`;

const positionsCloseQuery = gql`
  subscription positionsSubscription($signer: String!) {
    Extrinsics(
      where: {
        section: { _eq: "marginProtocol" }
        method: { _eq: "closePosition" }
        result: { _eq: "ExtrinsicSuccess" }
        signer: { _eq: $signer }
      }
      order_by: { blockNumber: desc }
    ) {
      args
      events(order_by: { phaseIndex: asc }, where: { method: { _eq: "PositionClosed" } }, limit: 1) {
        args
      }
      block {
        timestamp
      }
      hash
    }
  }
`;

const LaminarPositions = () => {
  const { address } = useCurrentAccount();
  const setState = useMargin(state => state.setState);
  const getTokenInfo = useGetTokenInfo();

  const { data: openedList } = useSubscription(positionsOpenQuery, {
    variables: {
      signer: address,
    },
  });

  const { data: closedList } = useSubscription(positionsCloseQuery, {
    variables: {
      signer: address,
    },
  });

  useLayoutEffect(() => {
    if (openedList && closedList) {
      const list = openedList.Extrinsics.map((data: any) => {
        const positionId = `${data.events[0].args[1]}`;

        const closed = !!closedList.Extrinsics.find(({ events }: any) => {
          return `${events[0].args[1]}` === positionId;
        });

        const pair = data.events[0].args[3];
        const [direction, leverage] = getLeverage(data.events[0].args[4]);

        const baseToken = getTokenInfo(pair.base);
        const quoteToken = getTokenInfo(pair.quote);

        const poolId = `${data.events[0].args[2]}`;
        const pairId = `${baseToken?.name}${quoteToken?.name}`;

        const openPrice = getValueFromHex(data.events[0].args[6]);
        const amt = getValueFromHex(data.events[0].args[5]);

        return {
          positionId,
          hash: data.hash,
          openedTime: data.block.timestamp,
          isClosed: !!closed,
          amt: getValueFromHex(data.events[0].args[5]),
          openPrice,
          pair,
          poolId,
          pairId,
          leverage,
          direction,
          swap: () => (
            <Swap
              key={data.hash}
              positionId={positionId}
              direction={direction === 'long' ? 'short' : 'long'}
              poolId={poolId}
              pairId={pairId}
            />
          ),
          pl: () => (
            <Pl
              held={amt}
              pair={pair}
              openPrice={openPrice}
              positionId={positionId}
              direction={direction === 'long' ? 'short' : 'long'}
              poolId={poolId}
              pairId={pairId}
            />
          ),
        };
      });

      setState(state => {
        state.positions = list;
      });

      return () => {};
    }

    return () => {};
  }, [openedList, closedList, setState, getTokenInfo]);

  return null;
};

export default LaminarPositions;
