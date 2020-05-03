import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useCurrentAccount } from '../../../hooks';
import useSwap from '../hooks/useSwap';

const swapRecordSubscription = gql`
  subscription swapRecordSubscription($signer: jsonb!) {
    Events(
      order_by: { blockNumber: desc }
      where: { method: { _in: ["Redeemed", "Minted"] }, args: { _contains: $signer } }
    ) {
      method
      args
      block {
        timestamp
      }
      extrinsic {
        hash
        method
      }
    }
  }
`;

const LaminarTxRecord: React.FC = () => {
  const account = useCurrentAccount();
  const setState = useSwap(state => state.setState);

  const { data } = useSubscription(swapRecordSubscription, {
    variables: {
      signer: account.address,
    },
  });

  useEffect(() => {
    if (data && data.Events) {
      const list = data.Events.map((item: any) => {
        return {
          txHash: item.extrinsic.hash,
          action: item.method,
          time: item.block.timestamp,
          fToken: item.args[1],
          baseToken: 'AUSD',
          fAmount: item.args[4],
          baseAmount: item.args[3],
        };
      });

      setState(state => {
        state.txRecords = list;
      });
    }
  }, [data]);

  return null;
};

export default LaminarTxRecord;
