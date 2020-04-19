import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import {} from 'react-i18next';

import { Panel, Table, Balance } from '../../components';
import useApp from '../../store/useApp';

type RenderBalancesProps = {};

const RenderBalances: React.FC<RenderBalancesProps> = ({}) => {
  const tokens = useApp(state => state.tokens);

  const columns: any[] = [
    {
      title: '',
      dataIndex: 'id',
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'right',
      render: (value: any) => <Balance tokenId={value} />,
    },
  ];

  return (
    <Panel title={'Balance'}>
      <Table columns={columns} dataSource={tokens} hideHeader rowKey="id" />
    </Panel>
  );
};

export default RenderBalances;
