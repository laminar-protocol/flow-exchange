import React, { useLayoutEffect } from 'react';

import { useApp } from '../../store/useApp';
import useOracle from '../../store/useOracle';

const OracleFeed: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const setOracleValues = useOracle(state => state.setOracleValues);

  useLayoutEffect(() => {
    if (currentApi?.oracleValues) {
      const s = currentApi.oracleValues().subscribe((data: any) => {
        setOracleValues(data);
      });

      return () => s && s.unsubscribe();
    }
  }, [currentApi, setOracleValues]);

  return null;
};

export default OracleFeed;
