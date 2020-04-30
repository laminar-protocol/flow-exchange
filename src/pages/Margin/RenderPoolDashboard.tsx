import { useSubscription } from '@apollo/react-hooks';
import clsx from 'clsx';
import gql from 'graphql-tag';
import React, { useLayoutEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Amount, Description, NumberFormat, Panel, Row, Space, Text, Tooltip } from '../../components';
import { useApi, useCurrentAccount } from '../../hooks';
import useApp, { AppState, useAppApi } from '../../store/useApp';
import useMarginEnable from './hooks/useMarginEnable';

type RenderPoolDashboardProps = {
  poolInfo: AppState['margin']['poolInfo']['string'];
  openDeposit: () => void;
  openWithdraw: () => void;
};

const positionOpenedSubscription = gql`
  subscription positionOpenedSubscription($signer: jsonb!) {
    Events(
      where: { method: { _eq: "PositionOpened" }, section: { _eq: "marginProtocol" }, args: { _contains: $signer } }
      order_by: { blockNumber: desc }
      limit: 1
    ) {
      blockNumber
    }
  }
`;

const RenderPoolDashboard: React.FC<RenderPoolDashboardProps> = ({ poolInfo, openDeposit, openWithdraw }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApi();
  const account = useCurrentAccount();
  const allowanceEnable = useMarginEnable();
  const traderInfo = useApp(state => state.margin.traderInfo);
  const { data } = useSubscription(positionOpenedSubscription, {
    variables: {
      signer: account.address,
    },
  });

  useLayoutEffect(() => {
    const subscription = api.margin?.marginInfo().subscribe((result: any) => {
      useAppApi.setState(state => {
        state.margin.marginInfo = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api]);

  useLayoutEffect(() => {
    if (poolInfo?.poolId && api.margin?.traderInfo) {
      const subscription = api.margin.traderInfo(account.address, poolInfo.poolId).subscribe((result: any) => {
        useAppApi.setState(state => {
          state.margin.traderInfo = result;
        });
      });

      return () => subscription?.unsubscribe();
    }
  }, [api, account, data, poolInfo]);

  const depositDisabledTip = useMemo(() => {
    if (!allowanceEnable) return 'NOT ENABLED';
    return '';
  }, [allowanceEnable]);

  return (
    <Panel>
      <Space direction="vertical" className={classes.header}>
        <Text size="s">{t('System Risk Parameters')}</Text>
        <Space size={32}>
          <Description label={t('Margin Call Threshold')}>
            <NumberFormat value={traderInfo.traderThreshold.marginCall} percent options={{ mantissa: 2 }} />
          </Description>
          <Description label={t('Stop Out Threshold')}>
            <NumberFormat value={traderInfo.traderThreshold.stopOut} percent options={{ mantissa: 2 }} />
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
                value={Number(traderInfo.equity) / Number(traderInfo.marginLevel)}
                options={{ mantissa: 3 }}
              />
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
