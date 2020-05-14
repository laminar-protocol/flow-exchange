import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Amount, Description, NumberFormat, Panel, Row, Space, Spinner, Text, Tooltip } from '../../components';
import { useQueryTraderInfo } from '../../store/useMarginPools';
import useMarginEnable from './hooks/useMarginEnable';

type RenderPoolDashboardProps = {
  poolId: string;
  openDeposit: () => void;
  openWithdraw: () => void;
  data: ReturnType<typeof useQueryTraderInfo>['data'];
};

const RenderPoolDashboard: React.FC<RenderPoolDashboardProps> = ({ data, openDeposit, openWithdraw }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const allowanceEnable = useMarginEnable();

  const depositDisabledTip = useMemo(() => {
    if (!allowanceEnable) return 'NOT ENABLED';
    return '';
  }, [allowanceEnable]);

  if (!data)
    return (
      <Panel>
        <Spinner />
      </Panel>
    );

  return (
    <Panel>
      <Space direction="vertical" className={classes.header}>
        <Text size="s">{t('System Risk Parameters')}</Text>
        <Space size={32}>
          <Description label={t('Margin Call Threshold')}>
            <NumberFormat value={data.traderThreshold.marginCall} percent options={{ mantissa: 2 }} />
          </Description>
          <Description label={t('Stop Out Threshold')}>
            <NumberFormat value={data.traderThreshold.stopOut} percent options={{ mantissa: 2 }} />
          </Description>
        </Space>
      </Space>
      <Space className={classes.level}>
        <Description label={t('Margin Level')}>
          <NumberFormat value={data.marginLevel} percent precision options={{ mantissa: 2 }} />
        </Description>
      </Space>
      <Row className={classes.detail}>
        <Space direction="vertical" style={{ flex: 1, marginRight: '2rem' }}>
          <Description label={t('Net Deposit/Withdraw')} justify="space-between"></Description>
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
          <Description label={t('Accumulated Swap')} justify="space-between"></Description>
          <Description label={t('Total Leveraged Position')} justify="space-between">
            {data.marginLevel ? (
              <NumberFormat value={Number(data.equity) / Number(data.marginLevel)} options={{ mantissa: 3 }} />
            ) : null}
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
