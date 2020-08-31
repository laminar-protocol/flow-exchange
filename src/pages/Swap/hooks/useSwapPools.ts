import { useMemo } from 'react';
import { useGetOraclePrice, useGetSyntheticPoolInfo } from '../../../hooks';
import useSyntheticPools from '../../../store/useSyntheticPools';
import useSwap from './useSwap';
import { isPresent } from '../../../utils';
import { toFixed18, fixed18toNumber } from '@laminar/api/utils';

const useSwapPools = () => {
  const baseToken = useSwap(state => state.baseToken);
  const exchangeToken = useSwap(state => state.exchangeToken);
  const isRedeem = useSwap(state => state.isRedeem);
  const allIds = useSyntheticPools(state => state.poolEntities.allIds);

  const getOraclePrice = useGetOraclePrice(exchangeToken?.id, baseToken?.id);
  const getSyntheticPoolInfo = useGetSyntheticPoolInfo();

  return useMemo(() => {
    return allIds
      .map(poolId => {
        const poolInfo = getSyntheticPoolInfo(poolId);
        const option = poolInfo?.options.find(({ tokenId }) => tokenId === exchangeToken?.id);
        if (option && poolInfo && option?.askSpread && option?.bidSpread) {
          const { value: askRate } = getOraclePrice(option.askSpread, 'long') || {};
          const { value: bidRate } = getOraclePrice(option.bidSpread, 'short') || {};
          const swapRate = toFixed18((!isRedeem ? 1 / Number(askRate) : bidRate) || 0);
          const collateralRatio = toFixed18(1 + fixed18toNumber(option.additionalCollateralRatio || '0'));

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
  }, [allIds, getSyntheticPoolInfo, getOraclePrice, isRedeem, exchangeToken]);
};

export default useSwapPools;
