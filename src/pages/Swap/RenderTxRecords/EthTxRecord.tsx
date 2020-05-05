import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useCurrentAccount } from '../../../hooks';
import useSwap from '../hooks/useSwap';
import { toPrecision } from '../../../utils';

const swapRecordSubscription = gql`
  subscription swapRecordSubscription($signer: String!) {
    eventEntities(orderBy: block, orderDirection: desc, where: { user: $signer }) {
      kind
      timestamp
      txhash
      token {
        symbol
      }
      liquidityPool
      baseTokenAmount
      flowTokenAmount
    }
  }
`;

const EthTxRecord: React.FC = () => {
  const account = useCurrentAccount();
  const setState = useSwap(state => state.setState);

  const { data } = useSubscription(swapRecordSubscription, {
    variables: {
      signer: account.address,
    },
  });

  useEffect(() => {
    if (data && data.eventEntities) {
      const list = data.eventEntities.map((item: any) => {
        return {
          txHash: item.txhash,
          action: item.kind,
          time: item.timestamp * 1000,
          fToken: item.token.symbol,
          baseToken: 'DAI',
          fAmount: toPrecision(item.flowTokenAmount),
          baseAmount: toPrecision(item.baseTokenAmount),
        };
      });

      setState(state => {
        state.txRecords = list;
      });
    }
  }, [data, setState]);

  return null;
};

export default EthTxRecord;
