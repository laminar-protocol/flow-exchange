import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Text, FormatBalance } from 'components';
import { tokens, TokenSymbol } from 'config';
import { fromWei } from 'helpers/unitHelper';

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

export interface OwnProps {
  symbol: string;
}

export interface StateProps {
  balance: string;
  isQueryingBalance: boolean;
  onBalanceQuery: (symbol: string) => void;
}

type Props = OwnProps & StateProps;

// ----------

const BalanceLine: React.FC<Props> = ({ symbol, balance, isQueryingBalance, onBalanceQuery }) => {
  useEffect(() => {
    onBalanceQuery(symbol);
  }, [onBalanceQuery, symbol]);

  const { displayName, currencySymbol } = tokens[symbol as TokenSymbol];

  return (
    <Line>
      <div>
        <Text>
          {displayName}
        </Text>
      </div>
      <div>
        <Text weight="bold">
          { isQueryingBalance ? '—' : <FormatBalance value={fromWei(balance)} options={{ prefix: currencySymbol }} /> }
        </Text>
      </div>
    </Line>
  );
};

export default BalanceLine;
