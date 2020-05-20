import React from 'react';
import { useLoadAccountBalance } from '../../store/useAccount';

const BalancesFeed: React.FC = () => {
  useLoadAccountBalance();
  return null;
};

export default BalancesFeed;
