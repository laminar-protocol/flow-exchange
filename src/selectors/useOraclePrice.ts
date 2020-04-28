import { useMemo } from 'react';

import { TokenId } from '../services';
import useOracleValue from './useOracleValue';
import { fromPrecision } from '../utils';

export const useOraclePrice = (
  baseTokenId: TokenId | null,
  quoteTokenId: TokenId | null,
  spread: number | null,
  direction: 'ask' | 'bid',
) => {
  const baseOracleValue = useOracleValue(baseTokenId as string);
  const quoteOracleValue = useOracleValue(quoteTokenId as string);

  return useMemo(() => {
    if (!baseOracleValue || !quoteOracleValue || !spread || !direction) return null;

    const price = Number(fromPrecision(baseOracleValue.value, 18)) / Number(fromPrecision(quoteOracleValue.value, 18));

    const _spread = direction === 'ask' ? 1 + spread : 1 - spread;

    return _spread * price;
  }, [baseOracleValue, quoteOracleValue, spread, direction]);
};

export default useOraclePrice;
