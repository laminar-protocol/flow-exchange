import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { Form, InputNumber, Select, Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { AppState } from 'reducers';
import { actions } from 'types';
import { Panel, SolidButton } from 'components';
import { tradingPairs, deployment } from 'config';
import { FormatBalance, FormatProfit, FormatPrice } from 'components/format';

interface OwnProps {
  name: string;
}

interface Props extends OwnProps {
  account: string;
  pairAddress: string;
  base: string;
  quote: string;
  leverage: number;
  isLong: boolean;
  liuqidationFee: number;
  liquidityPools: { address: string; name: string; spread: string; availability: number }[];
  isSending: boolean;

  onOpenPosition: (amount?: number, pool?: string) => void;
  onClosePosition: (id: string) => void;
}

const Container = styled(Panel)`
`;

const positionQuery = gql`
  subscription marginPositionEntities($owner: Bytes!, $pair: String!) {
    marginPositionEntities(orderBy: positionId, where: { owner: $owner, pair: $pair }) {
      positionId
      liquidityPool
      amount
      openPrice
      bidSpread
      liquidationFee
      closePrice
      liquidator
      closeOwnerAmount
    }
  }
`;

const positionsTableColumns: ColumnProps<any>[] = [
  {
    title: 'ID',
    dataIndex: 'positionId',
  }, {
    title: 'Liquidity Pool',
    dataIndex: 'liquidityPool',
  }, {
    title: 'Amount (DAI)',
    dataIndex: 'amount',
    render: (text) =>
      <FormatBalance value={text} />,
  }, {
    title: 'Open Price',
    dataIndex: 'openPrice',
    render: (text) =>
      <FormatPrice value={text} />,
  }, {
    title: 'Bid Spread (%)',
    dataIndex: 'bidSpread',
  }, {
    title: 'Liquidation Fee (DAI)',
    dataIndex: 'liquidationFee',
    render: (text) =>
      <FormatBalance value={text} />,
  }, {
    title: 'Close Price',
    dataIndex: 'closePrice',
    render: (text) =>
      <FormatPrice value={text} />,
  }, {
    title: 'Closed By',
    dataIndex: 'liquidator',
  }, {
    title: 'Closed Amount (DAI)',
    dataIndex: 'closeOwnerAmount',
    render: (text) =>
      <FormatBalance value={text} />,
  }, {
    title: 'Profit / Lost (DAI)',
    dataIndex: 'profit',
    render: (text) =>
      <FormatProfit value={text} />,
  }, {
    render: (_text, record) => record.closePrice == null && <Button loading={record.isSending} onClick={record.onClose}>Close Position</Button>,
  },
];

const TradingPair: React.FC<Props> = ({
  account, pairAddress, base, quote, leverage, isLong, liuqidationFee, liquidityPools, isSending,
  onOpenPosition, onClosePosition,
}) => {
  const [amount, setAmount] = useState(20 as number | undefined);
  const [pool, setPool] = useState(liquidityPools[0].address as string | undefined);
  const { loading, error, data } = useSubscription(positionQuery, {
    variables: {
      owner: account,
      pair: pairAddress.toLocaleLowerCase(),
    },
  });
  const positions = useMemo(() => data && data.marginPositionEntities.map((x: any) => ({
    ...x,
    profit: x.closePrice != null ? x.closeOwnerAmount - x.amount : null,
    onClose: () => onClosePosition(x.positionId),
    isSending,
    liquidityPool: x.liquidityPool.substring(0, 8), // TODO: improve this
    liquidator: x.liquidator && x.liquidator.substring(0, 8), // TODO: improve this
  })), [data, onClosePosition, isSending]);
  return (
    <Container>
      <Form labelCol={{ span: 3 }}>
        <Form.Item label="Tradingi Pair">
          <span className="ant-form-text">{base} {quote}</span>
        </Form.Item>
        <Form.Item label="Leverage">
          <span className="ant-form-text">x{leverage} {isLong ? 'Long' : 'Short'}</span>
        </Form.Item>
        <Form.Item label="Liquidation Fee">
          <span className="ant-form-text">{liuqidationFee} DAI</span>
        </Form.Item>
        <Form.Item label="Amount (DAI)">
          <InputNumber min={liuqidationFee + 1} value={amount} onChange={setAmount} />
            &nbsp; = {amount && amount - 5} margin + { liuqidationFee } liquidation fee
        </Form.Item>
        <Form.Item label="Liquidity Pool">
          <Select placeholder="Please choose a liquidity pool" value={pool} onChange={setPool}>
            {
              liquidityPools.map(({ address, name, spread, availability }) =>
                <Select.Option value={address} key="address">{name}: Spread: {spread}, Availability: {availability} ({address})</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <SolidButton disabled={!amount || !pool} loading={isSending} onClick={() => onOpenPosition(amount, pool)}>Open Position</SolidButton>
        </Form.Item>
      </Form>
      <Table columns={positionsTableColumns} loading={loading} dataSource={positions} rowKey="positionId" pagination={false} />
      { error && <div>Error: {error.message}</div> }
    </Container>
  );
};

const mapStateToProps = ({ margin: { openPosition, closePosition }, ethereum: { account } }: AppState, { name }: OwnProps) => {
  const pair = tradingPairs[name as keyof typeof tradingPairs]; // TODO: improve this
  return {
    account,
    pairAddress: deployment.kovan[name as keyof typeof deployment['kovan']], // TODO: improve this
    base: pair.base,
    quote: pair.quote,
    leverage: Math.abs(pair.leverage),
    isLong: pair.leverage > 0,
    liuqidationFee: 5, // TODO: read this value from contract
    liquidityPools: [ // TODO: read this from reducer
      {
        address: deployment.kovan.pool,
        name: 'Laminar',
        spread: '0.2%',
        availability: 100,
      },
      {
        address: deployment.kovan.pool2,
        name: 'Partner',
        spread: '0.3%',
        availability: 200,
      },
    ],
    isSending: openPosition.loading || closePosition.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, { name }: OwnProps) => ({
  onOpenPosition: (amount?: number, pool?: string) => {
    if (amount === undefined || pool === undefined) {
      return;
    }
    dispatch(actions.margin.openPosition.requested({ params: { name, amount, pool } }));
  },
  onClosePosition: (id: string) => {
    dispatch(actions.margin.closePosition.requested({ params: { name, id } }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradingPair);
