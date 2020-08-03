import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Amount, Date, DefaultButton, OraclePrice, Panel, SwitchChain, Table, TxHash } from '../../../components';
import { useApi, useCurrentAccount, useGetTradingPair } from '../../../hooks';
import { useLoadMarginBalance, useLoadTraderInfo } from '../../../store/useMarginPools';
import { BaseProps } from '../../../types';
import { notificationHelper, toPrecision } from '../../../utils';
import useMargin from '../hooks/useMargin';
import EthPositions from './EthPositions';
import LaminarPositions from './LaminarPositions';

type RenderPositionsProps = {
  filter?: (data: any) => boolean;
  poolId?: string;
};

const RenderPositions: React.FC<RenderPositionsProps & BaseProps> = ({ poolId, filter = x => true, ...other }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');

  const api = useApi();
  const account = useCurrentAccount();

  const { forceUpdate: updateTraderInfo } = useLoadTraderInfo({
    variables: { poolId: poolId || '' },
    isQuery: true,
    lazy: true,
  });

  const { forceUpdate: updateMarginBalance } = useLoadMarginBalance({
    isQuery: true,
    lazy: true,
  });

  const getTradingPair = useGetTradingPair();
  const [actionLoading, setActionLoading] = useState('');
  const positions = useMargin(state => state.positions);
  const list = useMemo(() => {
    return positions.filter(filter);
  }, [filter, positions]);

  const closePosition = async (positionId: string, direction: string) => {
    if (!api.margin?.closePosition) return;
    try {
      setActionLoading(positionId);
      await notificationHelper(
        api.margin.closePosition(
          account.address,
          positionId,
          direction === 'short' ? toPrecision('1000000000') : toPrecision('0'),
        ),
      );
    } finally {
      if (poolId) {
        updateTraderInfo();
      }
      updateMarginBalance();
      setActionLoading('');
    }
  };

  const openListColumns: any[] = [
    {
      title: t('#'),
      dataIndex: 'positionId',
    },
    {
      title: t('TX HASH'),
      dataIndex: 'hash',
      render: (value: string) => <TxHash value={value} />,
    },
    {
      title: t('SYMBOL'),
      dataIndex: 'pairId',
      align: 'right',
    },
    {
      title: t('DATETIME'),
      dataIndex: 'openedTime',
      align: 'right',
      render: (value: number) => <Date value={value} />,
    },
    {
      title: t('L/S'),
      dataIndex: 'direction',
      align: 'right',
      render: (value: string) => (value === 'long' ? 'L' : 'S'),
    },
    {
      title: t('LEVERAGE'),
      dataIndex: 'leverage',
      align: 'right',
    },
    {
      title: t('AMT'),
      dataIndex: 'amt',
      align: 'right',
      render: (value: string) => <Amount value={value} />,
    },
    {
      title: t('OPEN PRICE'),
      dataIndex: 'openPrice',
      align: 'right',
      render: (value: string) => <Amount value={value} mantissa={5} />,
    },
    {
      title: t('CUR. PRICE'),
      dataIndex: 'pairId',
      align: 'right',
      render: (_: any, record: any) => {
        const tradingPair = getTradingPair(record.poolId, record.pairId);

        return tradingPair ? (
          <OraclePrice
            spread={record.direction === 'long' ? tradingPair?.bidSpread : tradingPair?.askSpread}
            baseTokenId={record.pair.base}
            quoteTokenId={record.pair.quote}
            direction={record.direction === 'long' ? 'short' : 'long'}
          />
        ) : null;
      },
    },
    {
      title: t('SWAP'),
      dataIndex: 'swap',
      align: 'right',
      render: (renderFunc: any) => {
        return renderFunc && renderFunc();
      },
    },
    {
      title: t('P&L'),
      dataIndex: 'pl',
      align: 'right',
      render: (renderFunc: any) => {
        return renderFunc && renderFunc();
      },
    },
    {
      title: '',
      dataIndex: 'action',
      align: 'right',
      render: (_: any, record: any) => {
        if (record.isClosed) return null;
        return (
          <DefaultButton
            loading={actionLoading === record.positionId}
            onClick={() => closePosition(record.positionId, record.direction)}
          >
            Close
          </DefaultButton>
        );
      },
    },
  ];

  const closedListColumns: any[] = [
    {
      title: t('#'),
      dataIndex: 'positionId',
    },
    {
      title: t('TX HASH'),
      dataIndex: 'hash',
      render: (value: string) => <TxHash value={value} />,
    },
    {
      title: t('SYMBOL'),
      dataIndex: 'pairId',
      align: 'right',
    },
    {
      title: t('DATETIME'),
      dataIndex: 'openedTime',
      align: 'right',
      render: (value: number) => <Date value={value} />,
    },
    {
      title: t('Type'),
      dataIndex: 'closedMethod',
      align: 'right',
    },
    {
      title: t('L/S'),
      dataIndex: 'direction',
      align: 'right',
      render: (value: string) => (value === 'long' ? 'L' : 'S'),
    },
    {
      title: t('LEVERAGE'),
      dataIndex: 'leverage',
      align: 'right',
    },
    {
      title: t('AMT'),
      dataIndex: 'amt',
      align: 'right',
      render: (value: string) => <Amount value={value} />,
    },
    {
      title: t('OPEN PRICE'),
      dataIndex: 'openPrice',
      align: 'right',
      render: (value: string) => <Amount value={value} mantissa={5} />,
    },
    {
      title: t('LIQUIDATION PRICE'),
      dataIndex: 'closedPrice',
      align: 'right',
      render: (price: any) => {
        return <Amount value={price} mantissa={5} />;
      },
    },
    {
      title: t('SWAP'),
      dataIndex: 'swap',
      align: 'right',
      render: (renderFunc: any) => {
        return renderFunc && renderFunc();
      },
    },
    {
      title: t('P&L'),
      dataIndex: 'pl',
      align: 'right',
      render: (renderFunc: any) => {
        return renderFunc && renderFunc();
      },
    },
  ];

  return (
    <Panel
      title={t('My Positions / Orders')}
      actions={
        <div className={classes.tabs}>
          <div
            className={clsx(classes.tabItem, { [classes.activeTab]: activeTab === 'open' })}
            style={{
              borderBottomLeftRadius: 2,
              borderTopLeftRadius: 2,
            }}
            onClick={() => setActiveTab('open')}
          >
            {t('Open')}
          </div>
          <div
            className={clsx(classes.tabItem, { [classes.activeTab]: activeTab === 'closed' })}
            style={{
              borderBottomRightRadius: 2,
              borderTopRightRadius: 2,
            }}
            onClick={() => setActiveTab('closed')}
          >
            {t('Closed')}
          </div>
        </div>
      }
      {...other}
    >
      <SwitchChain renderLaminar={() => <LaminarPositions />} renderEthereum={() => <EthPositions />} />
      {activeTab === 'closed' ? (
        <Table
          variant="panelTable"
          size="small"
          columns={closedListColumns}
          pagination={{
            pageSize: 10,
          }}
          dataSource={list.filter(({ isClosed }) => isClosed)}
          rowKey="hash"
        />
      ) : (
        <Table
          variant="panelTable"
          size="small"
          columns={openListColumns}
          pagination={{
            pageSize: 10,
          }}
          dataSource={list.filter(({ isClosed }) => !isClosed)}
          rowKey="hash"
        />
      )}
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {},
  tabs: {
    display: 'flex',
    marginRight: '1rem',
    border: `1px solid ${theme.keyColorGrey}`,
    'border-radius': '2px',
  },
  tabItem: {
    padding: '0.5rem 1rem',
    background: theme.lightBackgroundColor,
    'border-left-bottom-radius': '2px',
    cursor: 'pointer',
  },
  activeTab: {
    background: theme.keyColorBlue,
    color: theme.whiteForegroundColor,
  },
}));

export default RenderPositions;
