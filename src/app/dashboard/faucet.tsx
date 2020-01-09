import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../../components';

export interface Props {
  amount: string;
  symbol: string;
  onOpenFaucet: (amount: string, symbol: string) => void;
}

const Faucet: React.FC<Props> = ({ amount, symbol, onOpenFaucet }) => (
  <Button
    onClick={() => {
      onOpenFaucet(symbol, amount);
    }}
  >
    <FontAwesomeIcon icon="shower" />
  </Button>
);

export default Faucet;
