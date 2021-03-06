import React from 'react';

import { useAccountBalance } from '../../hooks';
import { Amount } from '../Amount';

type AmountProps = React.ComponentProps<typeof Amount>;

type BalanceProps = {
  tokenId: Exclude<AmountProps['tokenId'], undefined>;
};

const Balance: React.FC<BalanceProps & Omit<AmountProps, 'value'>> = ({ tokenId, ...other }) => {
  const balance = useAccountBalance(tokenId);

  if (!balance || !balance.free) return null;

  return <Amount tokenId={tokenId} value={balance.free} {...other} />;
};

export default Balance;
