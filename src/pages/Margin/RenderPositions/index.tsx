import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Amount, Date, DefaultButton, OraclePrice, Panel, SwitchChain, Table, TxHash } from '../../../components';
import { useApi, useCurrentAccount } from '../../../hooks';
import { findTradingPair } from '../../../hooks/useTradingPair';
import useApp from '../../../store/useApp';
import { notificationHelper, toPrecision } from '../../../utils';
import useMargin from '../hooks/useMargin';
import LaminarPositions from './LaminarPositions';
import EthPositions from './EthPositions';

type RenderPositionsProps = {
  filter?: (data: any) => boolean;
};

const RenderPositions: React.FC<RenderPositionsProps> = ({ filter = x => true }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const positions = useMargin(state => state.positions);

  const api = useApi();
  const account = useCurrentAccount();
  const [actionLoading, setActionLoading] = useState('');
  const poolInfo = useApp(state => state.margin.poolInfo);

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
          direction === 'bid' ? toPrecision('1000000000') : toPrecision('0'),
        ),
      );
    } finally {
      setActionLoading('');
    }
  };

  const columns: any[] = [
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
      render: (value: string) => (value === 'ask' ? 'L' : 'S'),
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
      render: (value: number) => <Amount value={value} />,
    },
    {
      title: t('OPEN PRICE'),
      dataIndex: 'openPrice',
      align: 'right',
      render: (value: number) => <Amount value={value} minDigits={5} />,
    },
    {
      title: t('CUR. PRICE'),
      dataIndex: 'pairId',
      align: 'right',
      render: (_: any, record: any) => {
        const tradingPair = findTradingPair(poolInfo, record.poolId, record.pairId);

        return poolInfo[record.poolId] ? (
          <OraclePrice
            spread={record.direction === 'ask' ? tradingPair?.askSpread : tradingPair?.bidSpread}
            baseTokenId={record.pair.base}
            quoteTokenId={record.pair.quote}
            direction={record.direction}
          />
        ) : null;
      },
    },
    {
      title: t('SWAP'),
      dataIndex: 'pool',
      align: 'right',
    },
    {
      title: t('P&L'),
      dataIndex: 'pool',
      align: 'right',
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
    >
      <SwitchChain renderLaminar={() => <LaminarPositions />} renderEthereum={() => <EthPositions />} />
      {activeTab === 'closed' ? (
        <Table
          variant="panelTable"
          columns={columns}
          pagination={{
            pageSize: 10,
          }}
          dataSource={list.filter(({ isClosed }) => isClosed)}
          rowKey="hash"
        />
      ) : (
        <Table
          variant="panelTable"
          columns={columns}
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
