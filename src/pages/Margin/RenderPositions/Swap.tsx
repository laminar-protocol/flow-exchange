import React, { useMemo } from 'react';
import { NumberFormat } from '../../../components';
import { useAccumulatedSwapRateInfo, useMarginPositionInfo } from '../../../hooks';
import { useLoadMarginPosition } from '../../../store/useMarginPools';
import { fixed18toNumber } from '@laminar/api/utils';

type SwapProps = {
  positionId: string;
  poolId: string;
  pairId: string;
  direction: 'long' | 'short';
};

const Swap: React.FC<SwapProps> = React.memo(({ positionId, poolId, pairId, direction }) => {
  const position = useMarginPositionInfo(positionId);
  const accumulatedSwapRate = useAccumulatedSwapRateInfo(poolId, pairId);

  useLoadMarginPosition({
    variables: {
      positionId,
    },
  });

  const value = useMemo(() => {
    if (!accumulatedSwapRate?.[direction] || !position?.openAccumulatedSwapRate || !position?.leveragedHeld) return;
    const currentAccumulated = fixed18toNumber(accumulatedSwapRate[direction]);
    const openAccumulated = fixed18toNumber(position.openAccumulatedSwapRate);
    const leveragedHeld = fixed18toNumber(position.leveragedHeld);

    return (currentAccumulated - openAccumulated) * leveragedHeld;
  }, [position, accumulatedSwapRate, direction]);

  if (!value) return null;

  return <NumberFormat value={value} options={{ mantissa: 3 }} />;
});

export default Swap;
