import React from 'react';
import { Button } from '../../components';

export interface Props {
  amount: string;
  symbol: string;
  onOpenFaucet: (amount: string, symbol: string) => void;
}

const Faucet: React.FC<Props> = ({ amount, symbol, onOpenFaucet }) => (
  <Button
    onClick={() => { onOpenFaucet(symbol, amount); }}
  >
    {symbol} Faucet
  </Button>
);

export default Faucet;
