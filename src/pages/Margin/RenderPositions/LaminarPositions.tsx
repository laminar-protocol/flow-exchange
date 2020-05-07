import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useLayoutEffect } from 'react';
import { useCurrentAccount } from '../../../hooks';
import { getLeverage, getValueFromHex } from '../../../utils';
import useMargin from '../hooks/useMargin';

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
        const positionId = data.events[0].args[1];

        const closed = !!closedList.Extrinsics.find(({ args }: any) => {
          return args.position_id === positionId;
        });

        const pair = data.events[0].args[3];
        const [direction, leverage] = getLeverage(data.events[0].args[4]);

        return {
          positionId,
          hash: data.hash,
          openedTime: data.block.timestamp,
          isClosed: !!closed,
          amt: getValueFromHex(data.events[0].args[5]),
          openPrice: getValueFromHex(data.events[0].args[6]),
          pair,
          poolId: `${data.events[0].args[2]}`,
          pairId: `${pair.base}${pair.quote}`,
          leverage,
          direction,
        };
      });

      setState(state => {
        state.positions = list;
      });

      return () => {};
    }

    return () => {};
  }, [openedList, closedList, setState]);

  return null;
};

export default LaminarPositions;
