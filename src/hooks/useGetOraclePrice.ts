import BN from 'bn.js';
import { useCallback } from 'react';
import { TokenId } from '../services';
import { toPrecision, fromPrecision } from '../utils';
import useOracleValue from './useOracleValue';

export const useGetOraclePrice = (baseTokenId?: TokenId, quoteTokenId?: TokenId) => {
  const baseOracleValue = useOracleValue(baseTokenId as string);
  const quoteOracleValue = useOracleValue(quoteTokenId as string);

  return useCallback(
    (spread?: string, direction?: 'long' | 'short') => {
      if (!baseOracleValue?.value || !quoteOracleValue?.value || !spread || !direction) return null;

      const price = new BN(baseOracleValue.value).mul(toPrecision('1')).div(new BN(quoteOracleValue.value));

      const _spread = new BN(spread);

      return {
        value: Number(
          fromPrecision(direction === 'long' ? price.add(_spread).toString() : price.sub(_spread).toString(), 18),
        ),
        timestamp: Math.max(baseOracleValue.timestamp || 0, quoteOracleValue.timestamp || 0),
      };
    },
    [baseOracleValue, quoteOracleValue],
  );
};

export default useGetOraclePrice;
