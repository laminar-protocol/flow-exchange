import React, { useEffect } from 'react';

import { BalanceCell } from 'components';
import { fromWei } from 'helpers/unitHelper';
import { tokens } from 'config';

export interface OwnProps {
  symbol: string;
}

interface Props extends OwnProps {
  balance: string;
  isQueryingBalance: boolean;
  onBalanceQuery: (symbol: string) => void;
}

const Balance: React.FC<Props> = ({ symbol, balance, isQueryingBalance, onBalanceQuery }) => {
  useEffect(() => {
    onBalanceQuery(symbol);
  }, [onBalanceQuery, symbol]);

  const { icon, currencySymbol } = tokens[symbol as keyof typeof tokens];

  return (
    <BalanceCell
      value={fromWei(balance)}
      text={`${symbol} Balances`}
      loading={isQueryingBalance}
      accessory={icon}
      prefix={currencySymbol}
    />
  );
};

export default Balance;
