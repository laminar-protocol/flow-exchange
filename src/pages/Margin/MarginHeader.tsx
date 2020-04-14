import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useRouteMatch } from 'react-router-dom';

import useApp, { AppState, useAppApi } from '../../hooks/useApp';
import { useApiSelector, useAccountSelector } from '../../selectors';
import { Description, Panel, Row, Switch, Title, Amount, PoolName, NumberFormat, Space } from '../../components';

type MarginHeaderProps = {
  poolInfo?: AppState['margin']['poolInfo']['string'];
};

const MarginHeader: React.FC<MarginHeaderProps> = ({ poolInfo }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const match = useRouteMatch<{
    pairId: string;
    poolId: string;
  }>({
    path: '/margin/:poolId/:pairId',
    exact: true,
  });

  const api = useApiSelector();
  const account = useAccountSelector();
  const balance = useApp(state => state.margin.balance);

  useLayoutEffect(() => {
    const subscription = api.margin?.balance(account.address).subscribe((result: string) => {
      useAppApi.setState(state => {
        state.margin.balance = result;
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Panel padding="0.75rem 2rem">
      <Row justify="space-between">
        {match && poolInfo ? (
          <Space>
            <Title type="panel" className={classes.title} style={{ marginRight: 32 }}>
              {match.params.pairId}
            </Title>
            <Description layout="vertical" label={t('Pool')}>
              <PoolName value={poolInfo.poolId} />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('ENP')}>
              <NumberFormat value={poolInfo.enp} percent precision />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('ELL')}>
              <NumberFormat value={poolInfo.ell} percent precision />
            </Description>
          </Space>
        ) : (
          <div>
            <Title type="panel" className={classes.title}>
              {t('Margin Trading')}
            </Title>
          </div>
        )}

        <Row>
          <Description layout="vertical" label={t('TOTAL BALANCE')} align="flex-end">
            <Amount value={balance} tokenId={'LAMI'} hasPostfix />
          </Description>
          <div className={classes.separate} />
          <Description layout="vertical" label={t('ENABLE TRADING')} align="flex-end">
            <Switch className={classes.switch} checked={true} onClick={() => {}} />
          </Description>
        </Row>
      </Row>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  title: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  separate: {
    width: 1,
    height: '2.75rem',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    borderLeft: `solid 1px ${theme.keyColorGrey}`,
  },
  switch: {
    marginTop: '0.125rem',
  },
}));

export default MarginHeader;
