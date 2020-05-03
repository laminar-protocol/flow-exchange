import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useLayoutEffect } from 'react';
import { useCurrentAccount, useGetTokenInfo } from '../../../hooks';
import { getLeverage, getValueFromHex, toPrecision } from '../../../utils';
import useMargin from '../hooks/useMargin';

const positionsOpenQuery = gql`
  subscription positionsSubscription($signer: String!) {
    marginPositionEntities(where: { owner: $signer }, orderBy: openBlock, orderDirection: desc) {
      id
      base
      quote
      positionId
      owner
      liquidityPool
      amount
      openPrice
      openTime
      openTxhash
      openBlock
      closePrice
      liquidator
      realizedPl
      closeTime
      closeTxhash
      closeBlock
    }
  }
`;

const EthPositions = () => {
  const { address } = useCurrentAccount();
  const setState = useMargin(state => state.setState);
  const getTokenInfo = useGetTokenInfo();

  const { data: list } = useSubscription(positionsOpenQuery, {
    variables: {
      signer: address,
    },
  });

  useLayoutEffect(() => {
    if (list && list.marginPositionEntities) {
      const positions = list.marginPositionEntities.map((data: any) => {
        const base = getTokenInfo(data.base);
        const quote = getTokenInfo(data.quote);

        return {
          positionId: `${data.positionId}`,
          hash: data.openTxhash,
          openedTime: data.openTime * 1000,
          isClosed: !!data.closeBlock,
          // amt: getValueFromHex(data.events[0].args[5]),
          openPrice: toPrecision(data.openPrice),
          pair: {
            base: base?.id,
            quote: quote?.id,
          },
          poolId: data.liquidityPool,
          pairId: `${base?.name.toUpperCase()}${quote?.name.toUpperCase()}`,
          // leverage,
          // direction,
        };
      });

      setState(state => {
        state.positions = positions;
      });
    }

    return () => {};
  }, [list, setState, getTokenInfo]);

  return null;
};

export default EthPositions;
