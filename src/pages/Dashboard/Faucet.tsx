import React, { useCallback } from 'react';

import { DefaultButton, Icon } from '../../components';
import { useDispatch } from '../../hooks';
import types from '../../types';

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
    <DefaultButton
      onClick={() => {
        onOpenFaucet(symbol, amount);
      }}
    >
      <Icon icon="shower" />
    </DefaultButton>
  );
};

export default Faucet;
