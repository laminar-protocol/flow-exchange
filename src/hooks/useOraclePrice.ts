import { useMemo } from 'react';

import useGetOraclePrice from './useGetOraclePrice';
import { TokenId } from '../services';

export const useOraclePrice = (
  baseTokenId?: TokenId,
  quoteTokenId?: TokenId,
  spread?: string,
  direction?: 'long' | 'short',
) => {
  const getOraclePrice = useGetOraclePrice(baseTokenId, quoteTokenId);

  return useMemo(() => {
    return getOraclePrice(spread, direction);
  }, [getOraclePrice, spread, direction]);
};

export default useOraclePrice;
