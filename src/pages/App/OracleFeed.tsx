import React, { useLayoutEffect } from 'react';
import { useBaseTokenInfo } from '../../hooks';
import useApp from '../../store/useApp';
import useOracle from '../../store/useOracle';
import { toPrecision } from '../../utils';

const OracleFeed: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const baseTokenInfo = useBaseTokenInfo();
  const setOracleValues = useOracle(state => state.setOracleValues);

  useLayoutEffect(() => {
    if (currentApi && baseTokenInfo) {
      const s = currentApi.currencies.oracleValues().subscribe((data: any) => {
        setOracleValues(
          data.concat({
            tokenId: baseTokenInfo.id,
            timestamp: null,
            value: toPrecision(1).toString(),
          }),
        );
      });

      return () => s && s.unsubscribe();
    }
  }, [currentApi, setOracleValues, baseTokenInfo]);

  return null;
};

export default OracleFeed;
