import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useMemo } from 'react';

import { Amount, Date, Panel, Table, TxHash } from '../../components';
import { useCurrentAccount } from '../../hooks';

const swapRecordSubscription = gql`
  subscription swapRecordSubscription($signer: jsonb!) {
    Events(
      order_by: { blockNumber: desc }
      where: { method: { _in: ["Redeemed", "Minted"] }, args: { _contains: $signer } }
    ) {
      method
      args
      block {
        timestamp
      }
      extrinsic {
        hash
        method
      }
    }
  }
`;

const RenderTxRecords: React.FC = () => {
  const account = useCurrentAccount();

  const { data } = useSubscription(swapRecordSubscription, {
    variables: {
      signer: account.address,
    },
  });

  const list = useMemo(() => {
    if (!data) return [];
    return data.Events.map((item: any) => {
      return {
        txHash: item.extrinsic.hash,
        action: item.method,
        time: item.block.timestamp,
        fToken: item.args[1],
        baseToken: 'AUSD',
        fAmount: item.args[4],
        baseAmount: item.args[3],
      };
    });
  }, [data]);

  const columns: any[] = [
    {
      title: 'Tx Hash',
      dataIndex: 'txHash',
      render: (value: any) => <TxHash value={value} maxLength={20} />,
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
