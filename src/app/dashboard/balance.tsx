import React, { useEffect } from 'react';

import { BalanceCell } from 'components';
import { fromWei } from 'helpers/unitHelper';
import { tokens } from 'config';

// ----------
// Interface
// ----------

export interface OwnProps {
  symbol: string;
  label?: string;
}

export interface StateProps {
  balance: string;
  isQueryingBalance: boolean;
  onBalanceQuery: (symbol: string) => void;
}

type Props = OwnProps & StateProps;

// ----------

const Balance: React.FC<Props> = ({ symbol, label, balance, isQueryingBalance, onBalanceQuery }) => {
  useEffect(() => {
    onBalanceQuery(symbol);
  }, [onBalanceQuery, symbol]);

  const { icon, currencySymbol, name } = tokens[symbol as keyof typeof tokens];

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
