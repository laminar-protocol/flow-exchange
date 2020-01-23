import React, { useEffect } from 'react';

import { BalanceCell } from '../../components';
import { fromWei } from '../../helpers/unitHelper';
import { tokens } from '../../config';
import types from '../../types';
import { AppState } from '../../reducers';
import { getBalance, getIsQueryingBalance } from '../../reducers/token.reducer';
import { useDispatch, useShallowEqualSelector } from '../../hooks';

// ----------
// Interface
// ----------

export type Props = {
  symbol: string;
  label?: string;
};

export type StateProps = {
  balance: string;
  isQueryingBalance: boolean;
};

// ----------

const Balance: React.FC<Props> = ({ symbol, label }) => {
  const dispatch = useDispatch();

  const { balance, isQueryingBalance } = useShallowEqualSelector<AppState, StateProps>(({ token }: AppState) => ({
    balance: getBalance(symbol, token),
    isQueryingBalance: getIsQueryingBalance(symbol, token),
  }));

  useEffect(() => {
    dispatch({ type: types.token.balance.requested, payload: { symbol } });
  }, [dispatch, symbol]);

  const { icon, currencySymbol, name } = tokens[symbol];

  return (
    <BalanceCell
      value={fromWei(balance)}
      text={label || `${name} Balance`}
      loading={isQueryingBalance}
      accessory={icon}
      prefix={currencySymbol}
    />
  );
};

export default Balance;
