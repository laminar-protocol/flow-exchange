import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useHistory, useParams } from 'react-router-dom';

import { Panel, Row, Space } from '../../../components';
import useApp, { useAppApi } from '../../../store/useApp';
import { LeftArrowIcon } from '../../../icons';
import { useApiSelector } from '../../../selectors';
import ChartWidget from './ChartWidget';
import RenderTrade from '../RenderTrade';
import RenderHeader from '../RenderHeader';
import RenderPoolDashboard from '../RenderPoolDashboard';
import RenderPositions from '../RenderPositions';
import { RenderDepositModal, RenderWithdrawModal } from '../RenderDepositModal';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams<{
    poolId: string;
    pairId: string;
  }>();

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const api = useApiSelector();

  const poolInfo = useApp(state => state.margin.poolInfo[params.poolId]);

  useLayoutEffect(() => {
    if (params.poolId) {
      const subscription = api.margin?.poolInfo(params.poolId).subscribe((result: any) => {
        useAppApi.setState(state => {
          state.margin.poolInfo[result.poolId] = result;
        });
      });

      return () => subscription?.unsubscribe();
    }
  }, [api, params.poolId]);

  return (
    <Space direction="vertical" size={24}>
      <div className={classes.backButton} onClick={() => history.push('/margin')}>
        <LeftArrowIcon />
      </div>
      <RenderHeader poolInfo={poolInfo} />
      <Row className={classes.container}>
        <Panel title={t('Price Chart')} className={classes.chartContainer}>
          <ChartWidget symbol={params.pairId} className={classes.chartWidget} />
        </Panel>
        <Space direction="vertical" style={{ width: '27.25rem' }} size={24}>
          <RenderPoolDashboard
            poolInfo={poolInfo}
            openDeposit={() => setShowDeposit(true)}
            openWithdraw={() => setShowWithdraw(true)}
          />
          <RenderTrade poolInfo={poolInfo} pairId={params.pairId} />
        </Space>
      </Row>
      <RenderPositions />

      <RenderDepositModal
        visible={showDeposit}
        onCancel={() => setShowDeposit(false)}
        data={poolInfo}
        onOk={() => setShowDeposit(false)}
      />

      <RenderWithdrawModal
        visible={showWithdraw}
        onCancel={() => setShowWithdraw(false)}
        data={poolInfo}
        onOk={() => setShowWithdraw(false)}
      />
    </Space>
  );
};

const useStyles = createUseStyles(theme => ({
  container: { width: '100%' },
  backButton: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'font-size': '2.5rem',
    color: theme.textColor.greyColor4,
    width: '6.25rem',
    height: '3.375rem',
    'border-radius': '1.75rem',
    border: `solid 1px ${theme.keyColorGrey}`,
    'background-color': theme.alwaysWhiteForegroundColor,
    cursor: 'pointer',
  },
  chartContainer: {
    flex: 1,
    'margin-right': '1.5rem',
  },
  chartWidget: { height: '37.5rem' },
}));

export default MarginPools;
