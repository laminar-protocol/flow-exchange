import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Panel, Table, Title, Row } from '../../components';

const MarginPositions: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');

  const columns: any[] = [
    {
      title: t('TX HASH'),
      dataIndex: 'symbol',
    },
    {
      title: t('DATETIME'),
      dataIndex: 'bid',
      align: 'right',
    },
    {
      title: t('L/S'),
      dataIndex: 'ask',
      align: 'right',
    },
    {
      title: t('LEVERAGE'),
      dataIndex: 'enp',
      align: 'right',
    },
    {
      title: t('LOT'),
      dataIndex: 'ell',
      align: 'right',
    },
    {
      title: t('OPEN PRICE'),
      dataIndex: 'pool',
      align: 'right',
    },
    {
      title: t('CUR. PRICE'),
      dataIndex: 'pool',
      align: 'right',
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
      <Table
        columns={columns}
        className={classes.table}
        dataSource={[
          {
            symbol: 'USDUSD',
            bid: 'xxx',
            ask: 'xxx',
            enp: 'xxx',
            ell: 'xxx',
            pool: 'Laminar',
          },
        ]}
      />
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
