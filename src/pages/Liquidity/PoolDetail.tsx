import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Descriptions, Panel, Separator, Title } from '../../components';
import { poolInfoSelector, usePools, usePoolsSelector } from '../../hooks/usePools';

const PoolDetail: React.FC = () => {
  const params = useParams<{ poolId: string }>();
  const initPool = usePools(state => state.initPool);
  const liquidity = usePools(state => state.poolLiquidity[params.poolId]);
  const options = usePoolsSelector(poolInfoSelector(params.poolId), [params.poolId]);

  useEffect(() => {
    initPool(params.poolId);
  }, [initPool, params.poolId]);

  return (
    <div>
      <Title type="page">Liquidity Pool</Title>
      <Separator />
      <Panel>{/* <Descriptions><DescriptionItem>{options.}</DescriptionItem></Descriptions> */}</Panel>
    </div>
  );
};

export default PoolDetail;
