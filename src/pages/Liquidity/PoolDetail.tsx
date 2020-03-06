import React, { useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';

import {
  DescriptionItem,
  Descriptions,
  Panel,
  PrimaryButton,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  Title,
} from '../../components';
import { poolOptionsSelector, usePools } from '../../hooks/usePools';
import LiquidityProvider from './LiquidityProvider';

const PoolDetail: React.FC = () => {
  const params = useParams<{ poolId: string }>();
  const initPool = usePools(state => state.initPool);
  const options = usePools(useCallback(state => poolOptionsSelector(state, params.poolId), [params.poolId]));

  // const options = usePools(getPoolOptions);

  useEffect(() => {
    initPool(params.poolId);
  }, [initPool]);

  return (
    <div>
      <Title type="page">Liquidity Pool</Title>
      <Separator />
      <Panel>
        <Descriptions>{/* <DescriptionItem>{options.}</DescriptionItem> */}</Descriptions>
      </Panel>
    </div>
  );
};

export default PoolDetail;
