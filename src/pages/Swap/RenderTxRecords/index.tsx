import React from 'react';
import { Amount, Date, Panel, SwitchChain, Table, TxHash } from '../../../components';
import useSwap from '../hooks/useSwap';
import LaminarTxRecord from './LaminarTxRecord';
import EthTxRecord from './EthTxRecord';

const RenderTxRecords: React.FC = () => {
  const list = useSwap(state => state.txRecords);

  const columns: any[] = [
    {
      title: 'Tx Hash',
      dataIndex: 'txHash',
      render: (value: any) => <TxHash value={value} />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'right',
    },
    {
      title: 'fToken',
      dataIndex: 'fToken',
      align: 'right',
    },
    {
      title: 'Amount',
      dataIndex: 'id',
      align: 'right',
      render: (value: any, record: any) =>
        record.action === 'Redeemed' ? (
          <>
            <Amount value={record.fAmount} tokenId={record.fToken} minDigits={5} hasPostfix />
            =>
            <Amount value={record.baseAmount} tokenId={record.baseToken} minDigits={5} hasPostfix />
          </>
        ) : (
          <>
            <Amount value={record.baseAmount} tokenId={record.baseToken} minDigits={5} hasPostfix />
            =>
            <Amount value={record.fAmount} tokenId={record.fToken} minDigits={5} hasPostfix />
          </>
        ),
    },
    {
      title: 'Date',
      dataIndex: 'time',
      align: 'right',
      render: (value: any) => <Date value={value} format="YYYY/MM/DD" />,
    },
  ];

  return (
    <Panel title={'Transaction'}>
      <SwitchChain renderLaminar={() => <LaminarTxRecord />} renderEthereum={() => <EthTxRecord />} />
      <Table
        variant="panelTable"
        columns={columns}
        dataSource={list}
        rowKey="txHash"
        pagination={{
          pageSize: 10,
        }}
      />
    </Panel>
  );
};

export default RenderTxRecords;
