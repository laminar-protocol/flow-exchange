import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Descriptions, Panel, Separator, Title } from '../../components';
import { poolOptionsSelector, usePools, useStoreSelector } from '../../hooks/usePools';

const PoolDetail: React.FC = () => {
  const params = useParams<{ poolId: string }>();
  const initPool = usePools(state => state.initPool);
  const options = useStoreSelector(state => poolOptionsSelector(state, params.poolId), [params.poolId]);

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
