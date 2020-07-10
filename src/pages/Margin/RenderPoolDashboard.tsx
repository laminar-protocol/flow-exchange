import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Amount, Description, NumberFormat, Panel, Row, Space, Spinner, Text, Tooltip } from '../../components';
import useMarginEnableStore from './hooks/useMarginEnable';
import { useTraderInfo, useTraderThreshold } from '../../hooks';
type RenderPoolDashboardProps = {
  poolId: string;
  pairId: string;
  openDeposit: () => void;
  openWithdraw: () => void;
};

const RenderPoolDashboard: React.FC<RenderPoolDashboardProps> = ({ poolId, pairId, openDeposit, openWithdraw }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const allowanceEnable = useMarginEnableStore();
  const data = useTraderInfo(poolId);
  const traderThreshold = useTraderThreshold(pairId);

  const depositDisabledTip = useMemo(() => {
    if (!allowanceEnable) return 'NOT ENABLED';
    return '';
  }, [allowanceEnable]);

  if (!data)
    return (
      <Panel className={classes.loadingContainer}>
        <Spinner />
      </Panel>
    );

  console.log(data.marginLevel);
  return (
    <Panel>
      <Space direction="vertical" className={classes.header}>
        <Text size="s">{t('System Risk Parameters')}</Text>
        <Space size={32}>
          <Description label={t('Margin Call Threshold')}>
            {traderThreshold && <NumberFormat value={traderThreshold.marginCall} percent options={{ mantissa: 2 }} />}
          </Description>
          <Description label={t('Stop Out Threshold')}>
            {traderThreshold && <NumberFormat value={traderThreshold.stopOut} percent options={{ mantissa: 2 }} />}
          </Description>
        </Space>
      </Space>
      <Space className={classes.level}>
        <Description label={t('Margin Level')}>
          {data.marginLevel >= 100000 ? (
            'Very Safe'
          ) : (
            <NumberFormat value={data.marginLevel} percent options={{ mantissa: 2 }} />
          )}
        </Description>
      </Space>
      <Row className={classes.detail}>
        <Space direction="vertical" style={{ flex: 1, marginRight: '1rem' }}>
          <Description label={t('Balance')} justify="space-between">
            <Amount value={data.balance} />
          </Description>
          <Description label={t('Margin Held')} justify="space-between">
            <Amount value={data.marginHeld} />
          </Description>
          <Description label={t('Unrealized P/L')} justify="space-between">
            <Amount value={data.unrealizedPl} />
          </Description>
          <Description label={t('Equity')} justify="space-between">
            <Amount value={data.equity} />
          </Description>
        </Space>
        <Space direction="vertical" style={{ flex: 1 }}>
          <Description label={t('Realized P/L')} justify="space-between"></Description>
          <Description label={t('Free Margin')} justify="space-between">
            <Amount value={data.freeMargin} />
          </Description>
          <Description label={t('Accumulated Swap')} justify="space-between">
            <Amount value={data.accumulatedSwap} />
          </Description>
          <Description label={t('Total Leveraged Position')} justify="space-between">
            <Amount value={data.totalLeveragedPosition} />
          </Description>
        </Space>
      </Row>
      <Row align="middle" justify="center" className={classes.footer}>
        <Tooltip title={depositDisabledTip}>
          <div
            className={clsx(classes.footerActionLeft, {
              [classes.disabled]: !!depositDisabledTip,
            })}
            onClick={() => !depositDisabledTip && openDeposit()}
          >
            {t('Deposit')}
          </div>
        </Tooltip>
        <div className={classes.footerActionRight} onClick={() => openWithdraw()}>
          {t('Withdraw')}
        </div>
      </Row>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  loadingContainer: {
    'min-height': '16.25rem',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  },
  header: {
    padding: '1rem 1.5rem',
    'border-bottom': `solid 1px ${theme.keyColorGrey}`,
  },
  level: {
    padding: '1rem 1.5rem',
    'border-bottom': `solid 1px ${theme.keyColorGrey}`,
    width: '100%',
  },
  detail: {
    padding: '1rem 1.5rem',
    'border-bottom': `solid 1px ${theme.keyColorGrey}`,
    'justify-content': 'space-between',
    width: '100%',
  },
  footer: {
    '& $footerActionLeft, & $footerActionRight': {
      display: 'flex',
      flex: 1,
      'align-items': 'center',
      'justify-content': 'center',
      padding: '0.75rem',
      fontSize: '1rem',
      '&:hover': {
        background: theme.backgroundColor,
      },
    },
  },
  footerActionLeft: {
    'border-right': `1px solid ${theme.keyColorGrey}`,
    cursor: 'pointer',
    color: theme.keyColorBlue,
  },
  footerActionRight: {
    cursor: 'pointer',
    color: theme.keyColorRed,
  },
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
    '&$footerActionLeft:hover,&$footerActionRight:hover': {
      background: 'none',
    },
  },
}));

export default RenderPoolDashboard;
