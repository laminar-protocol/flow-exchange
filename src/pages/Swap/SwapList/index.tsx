import React from 'react';

import { useApiSelector } from '../../../selectors';

import EthereumSwapList from './EthereumSwapList';
import PolkadotSwapList from './PolkadotSwapList';

const SwapList: React.FC = () => {
  const api = useApiSelector();

  if (api.chainType === 'laminar') {
    return <PolkadotSwapList />;
  }

  if (api.chainType === 'ethereum') {
    return <EthereumSwapList />;
  }

  return null;
};

export default SwapList;
