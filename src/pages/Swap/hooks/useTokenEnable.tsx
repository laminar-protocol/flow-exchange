import { useMemo } from 'react';
import { useApi } from '../../../hooks';
import useSwap from './useSwap';

const useTokenEnable = () => {
  const api = useApi();
  const tokensAllowance = useSwap(state => state.tokensAllowance);
  const baseToken = useSwap(state => state.baseToken);
  const exchangeToken = useSwap(state => state.exchangeToken);
  const isRedeem = useSwap(state => state.isRedeem);
  console.log(tokensAllowance);
  return useMemo(() => {
    if (api.isLaminar) return true;
    const baseAllowance = baseToken ? tokensAllowance[baseToken.id] : '';
    const exchangeAllowance = exchangeToken ? tokensAllowance[exchangeToken.id] : '';

    if (isRedeem) {
      return !!(exchangeAllowance && exchangeAllowance !== '0');
    } else {
      return !!(baseAllowance && baseAllowance !== '0');
    }
  }, [api, tokensAllowance, baseToken, exchangeToken, isRedeem]);
};

export default useTokenEnable;
