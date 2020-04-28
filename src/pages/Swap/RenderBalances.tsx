import React from 'react';
import {} from 'react-i18next';
import { Balance, Panel, Table } from '../../components';
import useApp from '../../store/useApp';

type RenderBalancesProps = {};

const RenderBalances: React.FC<RenderBalancesProps> = () => {
  const tokens = useApp(state => state.tokens);

  const columns: any[] = [
    {
      title: '',
      dataIndex: 'name',
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
      <Table variant="panelTable" columns={columns} dataSource={tokens} hideHeader rowKey="id" />
    </Panel>
  );
};

export default RenderBalances;
