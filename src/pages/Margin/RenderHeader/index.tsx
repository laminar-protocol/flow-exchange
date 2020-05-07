import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useRouteMatch } from 'react-router-dom';

import { Description, NumberFormat, Panel, PoolName, Row, Space, Title, SwitchChain } from '../../../components';
import { MarginPoolsState } from '../../../store/useMarginPools';
import EnableTrading from './EnableTrading';
import TotalBalance from './TotalBalance';

type MarginHeaderProps = {
  poolInfo?: MarginPoolsState['poolInfo']['string'];
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

  return (
    <Panel padding="0.75rem 2rem">
      <Row justify="space-between">
        {match && poolInfo ? (
          <Space>
            <Title type="panel" className={classes.title} style={{ marginRight: 32 }}>
              {match.params.pairId}
            </Title>
            <Description layout="vertical" label={t('Pool')}>
              <PoolName value={poolInfo.poolId} type="margin" />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('ENP')}>
              <NumberFormat value={poolInfo.enp} percent precision options={{ mantissa: 2 }} />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('ELL')}>
              <NumberFormat value={poolInfo.ell} percent precision options={{ mantissa: 2 }} />
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
          <TotalBalance />
          <SwitchChain
            renderEthereum={() => {
              return (
                <>
                  <div className={classes.separate} />
                  <EnableTrading />
                </>
              );
            }}
          />
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
}));

export default MarginHeader;
