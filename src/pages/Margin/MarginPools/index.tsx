import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import {
  Col,
  Description,
  NumberFormat,
  OraclePrice,
  Panel,
  PoolName,
  Row,
  Table,
  Threshold,
  WebsiteTitle,
} from '../../../components';
import { useSymbolList } from '../../../hooks';
import useMarginPoolsStore, {
  useLoadMarginAccumulatedSwapRates,
  useLoadMarginBalance,
  useLoadMarginInfo,
  useLoadPoolEntities,
} from '../../../store/useMarginPools';
import useMargin from '../hooks/useMargin';
import RenderHeader from '../RenderHeader';
import RenderPositions from '../RenderPositions';
import RenderFastTradeButton from './RenderFastTradeButton';
import RenderPoolNameCard from './RenderPoolNameCard';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const selectedPoolId = useMargin(state => state.selectedPoolId);

  const symbolList = useSymbolList(selectedPoolId);
  const marginInfo = useMarginPoolsStore(state => state.marginInfo);
  const allPoolIds = useMarginPoolsStore(state => state.poolEntities.allIds);

  useLoadMarginInfo();
  useLoadPoolEntities();
  useLoadMarginBalance();
  useLoadMarginAccumulatedSwapRates();

  const columns: any[] = [
    {
      title: t('SYMBOL'),
      dataIndex: 'pairId',
      render: (value: any, record: any) => {
        return <div>{value}</div>;
      },
    },
    {
      title: t('BID'),
      dataIndex: 'bidSpread',
      align: 'right',
      render: (spread: any, record: any) => {
        return (
          <OraclePrice
            variant="tail"
            spread={spread}
            baseTokenId={record.pair.base}
            quoteTokenId={record.pair.quote}
            direction="short"
          />
        );
      },
    },
    {
      title: t('ASK'),
      dataIndex: 'askSpread',
      align: 'right',
      render: (spread: any, record: any) => {
        return (
          <OraclePrice
            variant="tail"
            spread={spread}
            baseTokenId={record.pair.base}
            quoteTokenId={record.pair.quote}
            direction="long"
          />
        );
      },
    },
    {
      title: t('ENP'),
      dataIndex: 'enp',
      align: 'right',
      sorter: (a: any, b: any) => a.enp - b.enp,
      showSorterTooltip: false,
      render: (value: number) => (
        <Threshold low={marginInfo.enpThreshold.marginCall} high={marginInfo.enpThreshold.stopOut} value={value} />
      ),
    },
    {
      title: t('ELL'),
      dataIndex: 'ell',
      align: 'right',
      sorter: (a: any, b: any) => a.ell - b.ell,
      showSorterTooltip: false,
      render: (value: number) => (
        <Threshold low={marginInfo.ellThreshold.marginCall} high={marginInfo.ellThreshold.stopOut} value={value} />
      ),
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
        return (
          <div
            onClick={event => {
              event.stopPropagation();
            }}
          >
            <RenderFastTradeButton poolId={record.poolId} pairId={record.pairId} />
          </div>
        );
      },
    },
  ];

  return (
    <div className={classes.root}>
      <WebsiteTitle value="Margin Trading" />
      <RenderHeader />
      <Row align="middle" className={classes.cardContainer}>
        <Col className={classes.cardItem}>
          <RenderPoolNameCard poolId={'ALL_POOLS'} />
        </Col>
        {allPoolIds.slice(0, 3).map(poolId => {
          return (
            <Col key={poolId} className={classes.cardItem}>
              <RenderPoolNameCard poolId={poolId} />
            </Col>
          );
        })}
        <Col style={{ flex: 1 }}>
          <Row style={{ marginRight: '2rem', flexWrap: 'nowrap' }} justify="end" className={classes.cardItem}>
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
      <Panel>
        <Table
          onRow={(record: any) => ({
            onClick: () => {
              history.push(`/margin/${record.poolId}/${record.pairId}`);
            },
          })}
          variant="panelTable"
          rowClassName={classes.selectRow}
          columns={columns}
          dataSource={symbolList}
          rowKey={(record: any) => `${record.poolId}/${record.pairId}`}
        />
      </Panel>
      <RenderPositions />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'grid',
    'grid-gap': '1.5rem',
  },
  cardContainer: {
    'margin-top': '-0.75rem',
    'margin-bottom': '-0.75rem',
  },
  cardItem: {
    'padding-top': '0.75rem',
    'padding-bottom': '0.75rem',
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
  selectRow: {
    cursor: 'pointer',
  },
}));

export default MarginPools;
