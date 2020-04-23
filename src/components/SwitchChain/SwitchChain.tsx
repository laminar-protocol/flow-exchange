import React, { useLayoutEffect, useState } from 'react';
import { useApiSelector } from '../../selectors';

type SwitchChainProps = {
  defaultValue?: React.ReactNode;
  laminar?: React.ReactNode;
  ethereum?: React.ReactNode;
};

const SwitchChain: React.FC<SwitchChainProps> = ({ laminar, ethereum, defaultValue, children }) => {
  const api = useApiSelector();

  const [chain, setChain] = useState('');

  useLayoutEffect(() => {
    if (api && api.chainType === 'ethereum') {
      setChain('ethereum');
    } else if (api && api.chainType === 'laminar') {
      setChain('laminar');
    } else {
      setChain('');
    }
  }, [api]);

  if (chain === 'ethereum') return <>{ethereum}</>;
  if (chain === 'laminar') return <>{laminar}</>;

  return defaultValue ? <>{defaultValue}</> : null;
};

export default SwitchChain;
