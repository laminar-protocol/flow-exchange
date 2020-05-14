import { useMemo } from 'react';
import useGetTokenInfo from './useGetTokenInfo';
import { TokenInfo } from '../services/Api';

export const useTokenInfo = (filter?: string | ((a: TokenInfo) => boolean)): TokenInfo | null => {
  const getTokenInfo = useGetTokenInfo();

  return useMemo(() => {
    return getTokenInfo(filter);
  }, [getTokenInfo, filter]);
};

export default useTokenInfo;
