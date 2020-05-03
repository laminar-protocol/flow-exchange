import { useMemo } from 'react';
import useGetTokenInfo from './useGetTokenInfo';

export const useTokenInfo = (tokenId?: string) => {
  const getTokenInfo = useGetTokenInfo();

  return useMemo(() => {
    return getTokenInfo(tokenId);
  }, [getTokenInfo, tokenId]);
};

export default useTokenInfo;
