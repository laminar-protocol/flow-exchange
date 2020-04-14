import React, { useLayoutEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { combineLatest } from 'rxjs';
import clsx from 'clsx';

import useApp, { useAppApi } from '../../hooks/useApp';
import { useApiSelector, useAccountSelector, useMarginSymbolListSelector } from '../../selectors';
import MarginHeader from './MarginHeader';
import MarginPositions from './MarginPositions';
import MarginFastTradeButton from './MarginFastTradeButton';
import {
  Panel,
  Table,
  Row,
  Col,
  Text,
  Description,
  Space,
  NumberFormat,
  Amount,
  PoolName,
  PrimaryButton,
} from '../../components';
import { IdentityIcon } from '../../icons';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const [active, setActive] = useState('');

  const api = useApiSelector();
  const account = useAccountSelector();
  const symbolList = useMarginSymbolListSelector(active);
  const marginInfo = useApp(state => state.margin.marginInfo);
  const poolInfo = useApp(state => state.margin.poolInfo);
  const allPoolIds = useApp(state => state.margin.allPoolIds);

  useLayoutEffect(() => {
    const subscription = api.margin?.marginInfo().subscribe((result: any) => {
      useAppApi.setState(state => {
        state.margin.marginInfo = result;
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  useLayoutEffect(() => {
    const subscription = api.margin?.allPoolIds().subscribe((result: any) => {
      useAppApi.setState(state => {
        state.margin.allPoolIds = result;
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  useLayoutEffect(() => {
    const subscription = combineLatest(
      allPoolIds.map(poolId => {
        return api.margin?.poolInfo(poolId);
      }),
    ).subscribe((result: any) => {
      result.map((poolInfo: any) => {
        useAppApi.setState(state => {
          state.margin.poolInfo[poolInfo.poolId] = poolInfo;
        });
      });
    });

    return () => subscription.unsubscribe();
  }, [allPoolIds, useAppApi]);

  const columns: any[] = [
    {
      title: t('SYMBOL'),
      dataIndex: 'pairId',
      render: (value: any, record: any) => {
        return (
          <div
            className={classes.selectRow}
            onClick={() => {
              history.push(`/margin/${record.poolId}/${record.pairId}`);
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      title: t('BID'),
      dataIndex: 'bidSpread',
      render: (value: number) => <NumberFormat value={value} options={{ mantissa: 2 }} percent />,
    },
    {
      title: t('ASK'),
      dataIndex: 'askSpread',
      render: (value: number) => <NumberFormat value={value} options={{ mantissa: 2 }} percent />,
    },
    {
      title: t('ENP'),
      dataIndex: 'enp',
      render: (value: string) => <NumberFormat value={value} options={{ mantissa: 2 }} percent precision />,
    },
    {
      title: t('ELL'),
      dataIndex: 'ell',
      render: (value: string) => <NumberFormat value={value} options={{ mantissa: 2 }} percent precision />,
    },
    {
      title: t('POOL'),
      dataIndex: 'poolId',
      align: 'right',
      render: (value: string) => <PoolName value={value} />,
    },
    {
      title: '',
      dataIndex: 'action',
      align: 'right',
      render: (_: any, record: any) => {
        return <MarginFastTradeButton data={record} pairId={record.pairId} />;
      },
    },
  ];

  return (
    <Space direction="vertical" size={24}>
      <MarginHeader />
      <Row align="middle" justify="space-between">
        <Col>
          <Row>
            <Col>
              <Panel
                className={clsx(classes.card, classes.all, { [classes.activeCard]: active === '' })}
                onClick={() => setActive('')}
              >
                <div>
                  <Text className={classes.text}>{t('All Pools')}</Text>
                </div>
              </Panel>
            </Col>
            {allPoolIds.map(poolId => {
              return (
                <Col key={poolId}>
                  <Panel
                    className={clsx(classes.card, { [classes.activeCard]: active === poolId })}
                    onClick={() => setActive(poolId)}
                  >
                    <Row style={{ height: '100%' }}>
                      <div className={classes.poolIcon}>
                        <IdentityIcon size={32} value={'5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'} />
                      </div>
                      <Description
                        layout="vertical"
                        label={
                          <div>
                            <Text size="n">
                              <PoolName value={poolId} />
                            </Text>
                            <Text size="s" style={{ paddingLeft: '0.25rem' }}>
                              AVAILABLE
                            </Text>
                          </div>
                        }
                        className={classes.pool}
                      >
                        <Amount value={poolInfo[poolId]?.balance} loading={!poolInfo[poolId]} />
                      </Description>
                    </Row>
                  </Panel>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col>
          <Row style={{ marginRight: '2rem' }}>
            <Description layout="vertical" label={t('Margin Call ENP')} align="flex-end">
              <NumberFormat value={marginInfo.enpThreshold.marginCall} percent />
            </Description>
            <div className={classes.separateWrap}>
              <div className={classes.separateItem1}></div>
              <div className={classes.separateItem2}></div>
            </div>
            <Description layout="vertical" label={t('ELL')}>
              <NumberFormat value={marginInfo.ellThreshold.marginCall} percent />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('Force Closure ENP')} align="flex-end">
              <NumberFormat value={marginInfo.enpThreshold.stopOut} percent />
            </Description>
            <div className={classes.separateWrap}>
              <div className={classes.separateItem1}></div>
              <div className={classes.separateItem2}></div>
            </div>
            <Description layout="vertical" label={t('ELL')}>
              <NumberFormat value={marginInfo.ellThreshold.stopOut} percent />
            </Description>
          </Row>
        </Col>
      </Row>
      <Panel className={classes.tableWrap}>
        <Table
          columns={columns}
          dataSource={symbolList}
          // rowClassName={classes.selectRow}
          // onRow={(record: any) => {
          //   return {
          //     onClick: () => {
          //       history.push(`/margin/${record.poolId}/${record.pairId}`);
          //     },
          //   };
          // }}
          rowKey={(record: any) => `${record.poolId}/${record.pairId}`}
        />
      </Panel>
      <MarginPositions />
    </Space>
  );
};

const useStyles = createUseStyles(theme => ({
  tableWrap: {
    marginBottom: '1.5rem',
    padding: '1rem 0',
  },
  all: {},
  text: {},
  pool: {
    flex: 1,
    'margin-left': '1rem',
    height: '100%',
  },
  poolIcon: {
    height: '100%',
    display: 'flex',
    'align-items': 'center',
    padding: '0.5rem',
    borderRight: `1px solid ${theme.borderColor}`,
  },
  separate: {
    width: 1,
    height: '2.5rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    borderLeft: `solid 1px ${theme.keyColorGrey}`,
  },
  separateWrap: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    marginTop: '0.20rem',
    marginBottom: '0.24rem',
  },
  separateItem1: {
    height: '0.6rem',
    borderLeft: `solid 1px ${theme.textColor.greyColor4}`,
  },
  separateItem2: {
    height: '0.75rem',
    borderLeft: `solid 1px ${theme.textColor.greyColor1}`,
  },
  card: {
    width: '13.125rem',
    marginRight: '1rem',
    height: '4rem',
    background: theme.lightBackgroundColor,
    cursor: 'pointer',
    '&:hover': {
      extend: '$activeCard',
    },
    '&$all': {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      '& $text': {
        fontSize: '1.25rem',
      },
    },
  },
  activeCard: {
    'box-shadow': '0 1px 20px 0 rgba(23, 65, 212, 0.18)',
    '& $text': {
      color: '#0155ff',
    },
    extend: theme.linearGradientRadiusBorder,
  },
  selectRow: {
    cursor: 'pointer',
  },
}));

export default MarginPools;
