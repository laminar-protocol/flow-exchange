import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useShallowEqualSelector } from '../hooks';
import { Text, FormatBalance } from '../components';
import { tokens, TokenSymbol } from '../config';
import { fromWei } from '../helpers/unitHelper';
import types from '../types';
import { AppState } from '../reducers';
import { getBalance, getIsQueryingBalance } from '../reducers/token.reducer';

const Line = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// ----------
// Interface
// ----------

export interface Props {
  symbol: string;
  lite?: boolean;
}

// ----------

const BalanceLine: React.FC<Props> = ({ symbol, lite }) => {
  const dispatch = useDispatch();

  const balance = useShallowEqualSelector((state: AppState) => getBalance(symbol, state.token));
  const isQueryingBalance = useShallowEqualSelector((state: AppState) => getIsQueryingBalance(symbol, state.token));

  useEffect(() => {
    dispatch({ type: types.token.balance.requested, payload: { symbol } });
  }, [symbol, dispatch]);

  const { displayName, currencySymbol } = tokens[symbol as TokenSymbol];

  if (lite) {
    return (
      <Text weight="bold">
        {isQueryingBalance ? '—' : <FormatBalance value={fromWei(balance)} options={{ prefix: currencySymbol }} />}
      </Text>
    );
  }

  return (
    <Line>
      <div>
        <Text>{displayName}</Text>
      </div>
      <div>
        <Text weight="bold">
          {isQueryingBalance ? '—' : <FormatBalance value={fromWei(balance)} options={{ prefix: currencySymbol }} />}
        </Text>
      </div>
    </Line>
  );
};

export default BalanceLine;
