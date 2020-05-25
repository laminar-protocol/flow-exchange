import BN from 'bn.js';
import React, { useMemo } from 'react';
import { Amount } from '../../../components';
import { useAccumulatedSwapRateInfo, useMarginPositionInfo } from '../../../hooks';
import { useLoadMarginPosition } from '../../../store/useMarginPools';
import { toPrecision } from '../../../utils';

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
    const currentAccumulated = accumulatedSwapRate[direction];
    const openAccumulated = position.openAccumulatedSwapRate;
    const leveragedHeld = new BN(position.leveragedHeld);

    return toPrecision(currentAccumulated)
      .sub(toPrecision(openAccumulated))
      .mul(leveragedHeld)
      .div(new BN(toPrecision(1)));
  }, [position, accumulatedSwapRate, direction]);

  if (!value) return null;

  return <Amount value={value} />;
});

export default Swap;
