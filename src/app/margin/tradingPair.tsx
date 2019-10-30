import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Form, InputNumber, Select } from 'antd';

import { AppState } from 'reducers';
import { actions } from 'types';
import { Panel, SolidButton } from 'components';
import { tradingPairs, deployment } from 'config';

interface OwnProps {
  name: string;
}

interface Props extends OwnProps {
  base: string;
  quote: string;
  leverage: number;
  isLong: boolean;
  liuqidationFee: number;
  liquidityPools: { address: string; name: string; spread: string; availability: number }[];
  isSending: boolean;

  onOpenPosition: (amount?: number, pool?: string) => void;
}

const Container = styled(Panel)`
`;

const TradingPair: React.FC<Props> = ({ base, quote, leverage, isLong, liuqidationFee, liquidityPools, isSending, onOpenPosition }) => {
  const [amount, setAmount] = useState(20 as number | undefined);
  const [pool, setPool] = useState(liquidityPools[0].address as string | undefined);
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
    </Container>
  );
};

const mapStateToProps = ({ margin: { openPosition } }: AppState, { name }: OwnProps) => {
  const pair = tradingPairs[name as keyof typeof tradingPairs];
  return {
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
    isSending: openPosition.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, { name }: OwnProps) => ({
  onOpenPosition: (amount?: number, pool?: string) => {
    if (amount === undefined || pool === undefined) {
      return;
    }
    dispatch(actions.margin.openPosition.requested({ params: { name, amount, pool } }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradingPair);
