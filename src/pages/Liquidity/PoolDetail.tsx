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
import { poolOptionsSelector, usePools, useStoreSelector } from '../../hooks/usePools';
import LiquidityProvider from './LiquidityProvider';

const PoolDetail: React.FC = () => {
  const params = useParams<{ poolId: string }>();
  const initPool = usePools(state => state.initPool);
  const options = useStoreSelector(state => poolOptionsSelector(state, params.poolId), [params.poolId]);

  useEffect(() => {
    console.log('options', params.poolId);
  }, [options]);

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
