import { useSubscription } from '@apollo/react-hooks';
import clsx from 'clsx';
import gql from 'graphql-tag';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Amount, Date, DefaultButton, OraclePrice, Panel, Table, TxHash } from '../../components';
import { useAccountSelector, useApiSelector } from '../../selectors';
import useApp from '../../store/useApp';
import { getValueFromHex, notificationHelper } from '../../utils';

const positionsOpenQuery = gql`
  subscription positionsSubscription($signer: String!) {
    Extrinsics(
      where: {
        section: { _eq: "marginProtocol" }
        method: { _eq: "openPosition" }
        result: { _eq: "ExtrinsicSuccess" }
        signer: { _eq: $signer }
      }
      order_by: { blockNumber: desc }
    ) {
      args
      events(order_by: { phaseIndex: asc }, where: { method: { _eq: "PositionOpened" } }, limit: 1) {
        args
      }
      block {
        timestamp
      }
      hash
    }
  }
`;

const positionsCloseQuery = gql`
  subscription positionsSubscription($signer: String!) {
    Extrinsics(
      where: {
        section: { _eq: "marginProtocol" }
        method: { _eq: "closePosition" }
        result: { _eq: "ExtrinsicSuccess" }
        signer: { _eq: $signer }
      }
      order_by: { blockNumber: desc }
    ) {
      args
      events(order_by: { phaseIndex: asc }, where: { method: { _eq: "PositionClosed" } }, limit: 1) {
        args
      }
      block {
        timestamp
      }
      hash
    }
  }
`;

const MarginPositions: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [list, setList] = useState([]);
  const api = useApiSelector();
  const account = useAccountSelector();
  const [actionLoading, setActionLoading] = useState('');
  const poolInfo = useApp(state => state.margin.poolInfo);

  const { data: openedList } = useSubscription(positionsOpenQuery, {
    variables: {
      signer: account.address,
    },
  });

  const { data: closedList } = useSubscription(positionsCloseQuery, {
    variables: {
      signer: account.address,
    },
  });

  const closePosition = async (positionId: string) => {
    if (!api.margin) return;
    try {
      setActionLoading(positionId);
      await notificationHelper(api.margin.closePosition(account.address, positionId));
    } finally {
      setActionLoading('');
    }
  };

  useLayoutEffect(() => {
    if (openedList && closedList) {
      const list = openedList.Extrinsics.map((data: any) => {
        const positionId = data.events[0].args[1];

        const closed = !!closedList.Extrinsics.find(({ args }: any) => {
          return args.position_id === positionId;
        });

        const pair = data.events[0].args[3];

        return {
          positionId,
          hash: data.hash,
          openedTime: data.block.timestamp,
          isClosed: !!closed,
          leverage: data.args.leverage,
          amt: getValueFromHex(data.events[0].args[5]),
          openPrice: getValueFromHex(data.events[0].args[6]),
          pair,
          poolId: `${data.events[0].args[2]}`,
          pairId: `${pair.base}${pair.quote}`,
          direction: data.events[0].args[4].includes('Short') ? 'bid' : 'ask',
        };
      });
      setList(list);

      return () => {};
    }

    return () => {};
  }, [openedList, closedList]);

  const columns: any[] = [
    {
      title: t('TX HASH'),
      dataIndex: 'hash',
      render: (value: string) => <TxHash value={value} maxLength={20} />,
    },
    {
      title: t('DATETIME'),
      dataIndex: 'openedTime',
      align: 'right',
      render: (value: number) => <Date value={value} />,
    },
    {
      title: t('L/S'),
      dataIndex: 'L/S',
      align: 'right',
      render: (value: number) => '-',
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
        return poolInfo[record.poolId] ? (
          <OraclePrice
            spread={
              record.direction === 'ask'
                ? poolInfo[record.poolId]?.options[record.pairId]?.askSpread
                : poolInfo[record.poolId]?.options[record.pairId]?.bidSpread
            }
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
          <DefaultButton loading={actionLoading === record.positionId} onClick={() => closePosition(record.positionId)}>
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
      {activeTab === 'closed' ? (
        <Table
          columns={columns}
          className={classes.table}
          pagination={{
            pageSize: 10,
          }}
          dataSource={list.filter(({ isClosed }) => isClosed)}
          rowKey="hash"
        />
      ) : (
        <Table
          columns={columns}
          className={classes.table}
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
  table: {
    '& .ant-table': {
      'border-radius': '0.75rem',
    },
    '& .ant-table tbody > tr:last-child > td': {
      'border-bottom': 'none',
    },
    '& .ant-table-pagination': {
      'margin-right': '1rem',
    },
  },
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

export default MarginPositions;
