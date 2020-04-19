import React, { useLayoutEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { useApp } from '../../store/useApp';
import { useSyntheticPools } from '../../store/useSyntheticPools';
import { useApiSelector } from '../../selectors';
import { Title, Space, Text, Row, Col, PoolName } from '../../components';
import RenderExchange from './RenderExchange';
import RenderSyntheticPools from './RenderSyntheticPools';
import RenderBalances from './RenderBalances';
import RenderTxRecords from './RenderTxRecords';

const Swap: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApiSelector();
  const setState = useSyntheticPools(state => state.setState);

  const ids = useSyntheticPools(state => state.ids);
  const [selectPoolId, setSelectPoolId] = useState('');

  useLayoutEffect(() => {
    if (ids.length && !selectPoolId) {
      setSelectPoolId(ids[0]);
    }
  }, [ids]);

  useLayoutEffect(() => {
    if (api?.synthetic?.allPoolIds) {
      const s = api.synthetic.allPoolIds().subscribe((result: any) => {
        setState(state => {
          state.ids = result;
        });
      });

      return () => s && s.unsubscribe();
    }
  }, [api]);

  return (
    <Space direction="vertical" size={24}>
      <Title type="page">{t('Swap')}</Title>
      <RenderExchange selectPoolId={selectPoolId} />
      <Text size="l">
        {t('Current Liquidity Provider')}: <PoolName value={selectPoolId} type="synthetic" />
      </Text>
      <RenderSyntheticPools onSelectPool={setSelectPoolId} selectPoolId={selectPoolId} />
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <RenderTxRecords />
        </Col>
        <Col span={8}>
          <RenderBalances />
        </Col>
      </Row>
    </Space>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {},
}));

export default Swap;
