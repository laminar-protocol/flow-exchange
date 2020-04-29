import { useMemo } from 'react';
import { useGetOraclePrice, useGetSyntheticPoolInfo } from '../../../hooks';
import useSyntheticPools from '../../../store/useSyntheticPools';
import useSwap from './useSwap';
import { isPresent } from '../../../utils';

const useSwapPools = () => {
  const baseToken = useSwap(state => state.baseToken);
  const exchangeToken = useSwap(state => state.exchangeToken);
  const isRedeem = useSwap(state => state.isRedeem);
  const ids = useSyntheticPools(state => state.ids);

  const getOraclePrice = useGetOraclePrice(exchangeToken?.id, baseToken?.id);
  const getSyntheticPoolInfo = useGetSyntheticPoolInfo();

  return useMemo(() => {
    return ids
      .map(poolId => {
        const poolInfo = getSyntheticPoolInfo(poolId);
        const option = poolInfo?.options.find(({ tokenId }) => tokenId === exchangeToken?.id);
        if (option && poolInfo && option?.askSpread && option?.bidSpread) {
          const askRate = getOraclePrice(option.askSpread, 'ask');
          const bidRate = getOraclePrice(option.bidSpread, 'bid');
          const swapRate = !isRedeem ? 1 / Number(askRate) : bidRate;
          const collateralRatio = 1 + Number(option.additionalCollateralRatio || null);

          return {
            ...poolInfo,
            ...option,
            askRate,
            bidRate,
            swapRate,
            collateralRatio,
          };
        }
        return null;
      })
      .filter(isPresent);
  }, [ids, getSyntheticPoolInfo, getOraclePrice, isRedeem, baseToken, exchangeToken]);
};

export default useSwapPools;
