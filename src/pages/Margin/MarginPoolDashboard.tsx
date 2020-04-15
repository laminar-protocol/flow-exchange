import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Amount, Description, NumberFormat, Panel, Row, Space, Text } from '../../components';
import useApp, { AppState, useAppApi } from '../../hooks/useApp';
import { useAccountSelector, useApiSelector } from '../../selectors';

type MarginPoolDashboardProps = {
  poolInfo: AppState['margin']['poolInfo']['string'];
  openDeposit: () => void;
  openWithdraw: () => void;
};

const MarginPoolDashboard: React.FC<MarginPoolDashboardProps> = ({ poolInfo, openDeposit, openWithdraw }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApiSelector();
  const account = useAccountSelector();
  const marginInfo = useApp(state => state.margin.marginInfo);
  const traderInfo = useApp(state => state.margin.traderInfo);

  useLayoutEffect(() => {
    const subscription = api.margin?.marginInfo().subscribe((result: any) => {
      useAppApi.setState(state => {
        state.margin.marginInfo = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api]);

  useLayoutEffect(() => {
    const subscription = api.margin?.traderInfo(account.address).subscribe((result: any) => {
      useAppApi.setState(state => {
        state.margin.traderInfo = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api, account]);

  return (
    <Panel>
      <Space direction="vertical" className={classes.header}>
        <Text size="s">{t('System Risk Parameters')}</Text>
        <Space size={32}>
          <Description label={t('Margin Call Threshold')}>
            <NumberFormat value={marginInfo.traderThreshold.marginCall} percent options={{ mantissa: 2 }} />
          </Description>
          <Description label={t('Stop Out Threshold')}>
            <NumberFormat value={marginInfo.traderThreshold.stopOut} percent options={{ mantissa: 2 }} />
          </Description>
        </Space>
      </Space>
      <Space className={classes.level}>
        <Description label={t('Margin Level')}>
          <NumberFormat value={traderInfo.marginLevel} percent precision options={{ mantissa: 2 }} />
        </Description>
      </Space>
      <Row className={classes.detail}>
        <Space direction="vertical" style={{ flex: 1, marginRight: '2rem' }}>
          <Description label={t('Net Deposit/Withdraw')} justify="space-between"></Description>
          <Description label={t('Margin Held')} justify="space-between">
            <Amount value={traderInfo.marginHeld} />
          </Description>
          <Description label={t('Unrealized P/L')} justify="space-between">
            <Amount value={traderInfo.unrealizedPl} />
          </Description>
          <Description label={t('Equity')} justify="space-between">
            <Amount value={traderInfo.equity} />
          </Description>
        </Space>
        <Space direction="vertical" style={{ flex: 1 }}>
          <Description label={t('Realized P/L')} justify="space-between"></Description>
          <Description label={t('Free Margin')} justify="space-between">
            <Amount value={traderInfo.freeMargin} />
          </Description>
          <Description label={t('Accumulated Swap')} justify="space-between"></Description>
          <Description label={t('Total Leveraged Position')} justify="space-between">
            {traderInfo.marginLevel ? (
              <NumberFormat
                value={Number(traderInfo.marginHeld) / Number(traderInfo.marginLevel)}
                options={{ mantissa: 5 }}
              />
            ) : null}
          </Description>
        </Space>
      </Row>
      <Row align="middle" justify="center" className={classes.footer}>
        <div className={classes.footerActionLeft} onClick={() => openDeposit()}>
          {t('Deposit')}
        </div>
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
      cursor: 'pointer',
      '&:hover': {
        background: theme.backgroundColor,
      },
    },
  },
  footerActionLeft: {
    'border-right': `1px solid ${theme.keyColorGrey}`,
    color: theme.keyColorBlue,
  },
  footerActionRight: {
    color: theme.keyColorRed,
  },
}));

export default MarginPoolDashboard;
