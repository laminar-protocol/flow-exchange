import React, { useLayoutEffect, useState } from 'react';
import { useApiSelector } from '../../selectors';

type SwitchChainProps = {
  defaultValue?: React.ReactNode;
  renderLaminar?: () => React.ReactNode;
  renderEthereum?: () => React.ReactNode;
};

const SwitchChain: React.FC<SwitchChainProps> = ({ renderLaminar, renderEthereum, defaultValue, children }) => {
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

  if (chain === 'ethereum' && renderEthereum) return <>{renderEthereum()}</>;
  if (chain === 'laminar' && renderLaminar) return <>{renderLaminar()}</>;

  return defaultValue ? <>{defaultValue}</> : null;
};

export default SwitchChain;
