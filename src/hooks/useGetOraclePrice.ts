import { useCallback } from 'react';

import { TokenId } from '../services';
import useOracleValue from './useOracleValue';
import { fromPrecision } from '../utils';

export const useGetOraclePrice = (baseTokenId?: TokenId, quoteTokenId?: TokenId) => {
  const baseOracleValue = useOracleValue(baseTokenId as string);
  const quoteOracleValue = useOracleValue(quoteTokenId as string);

  return useCallback(
    (spread?: string, direction?: 'long' | 'short') => {
      if (!baseOracleValue || !quoteOracleValue || !spread || !direction) return null;

      const price =
        Number(fromPrecision(baseOracleValue.value, 18)) / Number(fromPrecision(quoteOracleValue.value, 18));

      const _spread = Number(fromPrecision(spread, 18));

      return {
        value: direction === 'long' ? price + _spread : price - _spread,
        timestamp: Math.max(baseOracleValue.timestamp || 0, quoteOracleValue.timestamp || 0),
      };
    },
    [baseOracleValue, quoteOracleValue],
  );
};

export default useGetOraclePrice;
