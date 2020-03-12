import React, { useEffect } from 'react';

import { useApp } from '../../hooks/useApp';
import { usePools, usePoolsApi } from '../../hooks/usePools';

const Init: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const queryCustomPools = usePools(state => state.queryCustomPools);
  const defaultPools = useApp(state => state.defaultPools);

  useEffect(() => {
    if (!currentApi) return;
    usePoolsApi.setState(state => {
      state.defaultPool = defaultPools ? defaultPools[0] : null;
      if (defaultPools) state.defaultPools = defaultPools;
      state.customPools = queryCustomPools();
    });
  }, [defaultPools, queryCustomPools, currentApi]);

  return null;
};

export default Init;
