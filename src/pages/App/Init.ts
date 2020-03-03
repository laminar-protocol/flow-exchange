import React, { useEffect } from 'react';

import { useApp } from '../../hooks/useApp';
import { usePoolsApi } from '../../hooks/usePools';

const Init: React.FC = () => {
  const api = useApp(state => state.api);
  const defaultPools = useApp(state => state.defaultPools);

  useEffect(() => {
    if (!api) return;
    usePoolsApi.setState(state => {
      state.defaultPool = defaultPools ? defaultPools[0] : null;
      state.pools = defaultPools;
    });
  }, [defaultPools, api, usePoolsApi]);

  return null;
};

export default Init;
