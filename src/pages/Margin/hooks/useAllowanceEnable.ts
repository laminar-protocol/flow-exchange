import { useMemo } from 'react';
import { useApi } from '../../../hooks';
import useMargin from './useMargin';

const useAllowanceEnable = () => {
  const api = useApi();
  const allowance = useMargin(state => state.allowance);

  return useMemo(() => {
    if (api.chainType === 'laminar') return true;
    return !!(allowance && allowance !== '0');
  }, [api, allowance]);
};

export default useAllowanceEnable;
