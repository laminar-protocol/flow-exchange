import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../../components';
import types from '../../types';
import { useDispatch } from '../../hooks';

export interface Props {
  amount: string;
  symbol: string;
}

const Faucet: React.FC<Props> = ({ amount, symbol }) => {
  const dispatch = useDispatch();

  const onOpenFaucet = useCallback(
    (symbol: string, amount: string) => {
      dispatch({ type: types.faucet.dai.requested, payload: { amount, symbol } });
    },
    [dispatch],
  );

  return (
    <Button
      onClick={() => {
        onOpenFaucet(symbol, amount);
      }}
    >
      <FontAwesomeIcon icon="shower" />
    </Button>
  );
};

export default Faucet;
