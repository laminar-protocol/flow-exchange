import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useHistory, useParams } from 'react-router-dom';
import { Panel, Row, Space, WebsiteTitle } from '../../../components';
import { LeftArrowIcon } from '../../../icons';
import {
  useLoadMarginAccumulatedSwapRates,
  useLoadMarginBalance,
  useLoadMarginInfo,
  useLoadMarginTraderThreshold,
  useLoadTraderInfo,
} from '../../../store/useMarginPools';
import { RenderDepositModal, RenderWithdrawModal } from '../RenderDepositModal';
import RenderHeader from '../RenderHeader';
import RenderPoolDashboard from '../RenderPoolDashboard';
import RenderPositions from '../RenderPositions';
import RenderTrade from '../RenderTrade';
import ChartWidget from './ChartWidget';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { poolId, pairId } = useParams<{
    poolId: string;
    pairId: string;
  }>();

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  useLoadMarginBalance();
  useLoadMarginInfo();
  useLoadMarginAccumulatedSwapRates();
  useLoadMarginTraderThreshold({ variables: { pairId } });
  useLoadTraderInfo({ variables: { poolId } });

  return (
    <div className={classes.root}>
      <WebsiteTitle value={pairId} />
      <div className={classes.backButton} onClick={() => history.push('/margin')}>
        <LeftArrowIcon />
      </div>
      <RenderHeader poolId={poolId} pairId={pairId} isPool={true} />
      <Row className={classes.container}>
        <Panel title={t('Price Chart')} className={classes.chartContainer}>
          <ChartWidget symbol={pairId} className={classes.chartWidget} />
        </Panel>
        <Space direction="vertical" style={{ width: '27.25rem' }} size={24}>
          <RenderPoolDashboard
            pairId={pairId}
            poolId={poolId}
            openDeposit={() => setShowDeposit(true)}
            openWithdraw={() => setShowWithdraw(true)}
          />
          <RenderTrade poolId={poolId} pairId={pairId} />
        </Space>
      </Row>
      <RenderPositions poolId={poolId} filter={(item: any) => poolId === item.poolId && pairId === item.pairId} />

      <RenderDepositModal
        visible={showDeposit}
        onCancel={() => setShowDeposit(false)}
        poolId={poolId}
        onOk={() => setShowDeposit(false)}
      />

      <RenderWithdrawModal
        visible={showWithdraw}
        onCancel={() => setShowWithdraw(false)}
        poolId={poolId}
        onOk={() => setShowWithdraw(false)}
      />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'grid',
    'grid-gap': '1.5rem',
  },
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
