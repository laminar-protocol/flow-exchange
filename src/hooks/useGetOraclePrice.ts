import { useCallback } from 'react';

import { TokenId } from '../services';
import useOracleValue from './useOracleValue';
import { fromPrecision } from '../utils';

export const useGetOraclePrice = (
  baseTokenId: TokenId | null | undefined,
  quoteTokenId: TokenId | null | undefined,
) => {
  const baseOracleValue = useOracleValue(baseTokenId as string);
  const quoteOracleValue = useOracleValue(quoteTokenId as string);

  return useCallback(
    (spread: number | null, direction: 'ask' | 'bid') => {
      if (!baseOracleValue || !quoteOracleValue || !spread || !direction) return null;

      const price =
        Number(fromPrecision(baseOracleValue.value, 18)) / Number(fromPrecision(quoteOracleValue.value, 18));

      const _spread = direction === 'ask' ? 1 + spread : 1 - spread;

      return _spread * price;
    },
    [baseOracleValue, quoteOracleValue],
  );
};

export default useGetOraclePrice;
