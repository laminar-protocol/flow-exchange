import clsx from 'clsx';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import { combineLatest } from 'rxjs';

import {
  Amount,
  Col,
  Description,
  NumberFormat,
  Panel,
  PoolName,
  Row,
  Space,
  Table,
  Text,
  OraclePrice,
} from '../../../components';
import useApp from '../../../store/useApp';
import { IdentityIcon } from '../../../icons';
import { useApiSelector, useSymbolListSelector } from '../../../selectors';
import RenderFastTradeButton from './RenderFastTradeButton';
import RenderHeader from '../RenderHeader';
import RenderPositions from '../RenderPositions';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const setState = useApp(state => state.setState);

  const [active, setActive] = useState('');

  const api = useApiSelector();
  const symbolList = useSymbolListSelector(active);
  const marginInfo = useApp(state => state.margin.marginInfo);
  const poolInfo = useApp(state => state.margin.poolInfo);
  const allPoolIds = useApp(state => state.margin.allPoolIds);

  useLayoutEffect(() => {
    const subscription = api.margin?.marginInfo().subscribe((result: any) => {
      setState(state => {
        state.margin.marginInfo = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api, setState]);

  useLayoutEffect(() => {
    const subscription = api.margin?.allPoolIds().subscribe((result: any) => {
      setState(state => {
        state.margin.allPoolIds = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api, setState]);

  useLayoutEffect(() => {
    const subscription = combineLatest(
      allPoolIds.map(poolId => {
        return api.margin?.poolInfo(poolId);
      }),
    ).subscribe((result: any) => {
      for (const item of result) {
        setState(state => {
          state.margin.poolInfo[item.poolId] = item;
        });
      }
    });

    return () => subscription?.unsubscribe();
  }, [api, allPoolIds, setState]);

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
      align: 'right',
      render: (spread: any, record: any) => {
        return poolInfo[record.poolId] ? (
          <OraclePrice
            spread={spread}
            baseTokenId={record.pair.base}
            quoteTokenId={record.pair.quote}
            direction="bid"
          />
        ) : null;
      },
    },
    {
      title: t('ASK'),
      dataIndex: 'askSpread',
      align: 'right',
      render: (spread: any, record: any) => {
        return poolInfo[record.poolId] ? (
          <OraclePrice
            spread={spread}
            baseTokenId={record.pair.base}
            quoteTokenId={record.pair.quote}
            direction="ask"
          />
        ) : null;
      },
    },
    {
      title: t('ENP'),
      dataIndex: 'enp',
      align: 'right',
      sorter: (a: any, b: any) => a.enp - b.enp,
      showSorterTooltip: false,
      render: (value: string) => <NumberFormat value={value} options={{ mantissa: 2 }} percent precision />,
    },
    {
      title: t('ELL'),
      dataIndex: 'ell',
      align: 'right',
      sorter: (a: any, b: any) => a.ell - b.ell,
      showSorterTooltip: false,
      render: (value: string) => <NumberFormat value={value} options={{ mantissa: 2 }} percent precision />,
    },
    {
      title: t('POOL'),
      dataIndex: 'poolId',
      align: 'right',
      render: (value: string) => <PoolName value={value} type="margin" />,
    },
    {
      title: '',
      dataIndex: 'action',
      align: 'right',
      render: (_: any, record: any) => {
        return <RenderFastTradeButton data={record} pairId={record.pairId} />;
      },
    },
  ];

  return (
    <Space direction="vertical" size={24}>
      <RenderHeader />
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
                              <PoolName value={poolId} type="margin" />
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
              <NumberFormat value={marginInfo.enpThreshold.marginCall} percent options={{ mantissa: 2 }} />
            </Description>
            <div className={classes.separateWrap}>
              <div className={classes.separateItem1}></div>
              <div className={classes.separateItem2}></div>
            </div>
            <Description layout="vertical" label={t('ELL')}>
              <NumberFormat value={marginInfo.ellThreshold.marginCall} percent options={{ mantissa: 2 }} />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('Force Closure ENP')} align="flex-end">
              <NumberFormat value={marginInfo.enpThreshold.stopOut} percent options={{ mantissa: 2 }} />
            </Description>
            <div className={classes.separateWrap}>
              <div className={classes.separateItem1}></div>
              <div className={classes.separateItem2}></div>
            </div>
            <Description layout="vertical" label={t('ELL')}>
              <NumberFormat value={marginInfo.ellThreshold.stopOut} percent options={{ mantissa: 2 }} />
            </Description>
          </Row>
        </Col>
      </Row>
      <Panel className={classes.tableWrap}>
        <Table
          columns={columns}
          dataSource={symbolList}
          rowKey={(record: any) => `${record.poolId}/${record.pairId}`}
        />
      </Panel>
      <RenderPositions />
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