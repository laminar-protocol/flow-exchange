import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Text, SolidButton, Separator, Input,
} from 'components';
import { usePriceRate } from 'hooks/useOraclePrice';
import { tradingSymbols, tradingPairs, liquidityPools } from 'config';
import * as theme from 'theme';

import { formatRate } from './format';

const Container = styled.div``;

const TradeLine = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TradeButton = styled.div`
  display: flex;
  flex-direction: row;
  ${SolidButton} {
    text-transform: uppercase;
    flex: 1;
    &:first-child {
      margin-right: 0.5rem;
    }
    &:last-child {
      margin-left: 0.5rem;
    }
  }
`;

const TradePrice = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  ${Text} {
    text-align:center;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    flex: 1;
    &:first-child {
      margin-right: 0.5rem;
    }
    &:last-child {
      margin-left: 0.5rem;
    }
  }
`;


const SellButton = styled(SolidButton)`
  &.ant-btn,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active
  {
    background-color: ${theme.sellColor};
  }
`;

const BuyButton = styled(SolidButton)`
  &.ant-btn,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active
  {
    background-color: ${theme.buyColor};
  }
`;

// ----------
// Interface
// ----------

export interface OwnProps {
  symbol: string;
  pool: string;
}

export interface StateProps {
  isEnabled: boolean;
  isOpening: boolean;
  onOpenPosition: (name?: string, amount?: number, pool?: string) => void;
}

type Props = OwnProps & StateProps;

// ----------

const Trade: React.FC<Props> = ({ symbol, pool, isEnabled, isOpening, onOpenPosition }) => {
  // TODO: Fix type
  const tradingSymbol = (tradingSymbols as any)[symbol];
  const liquidityPool = (liquidityPools as any)[pool];
  const tradingPair = (tradingPairs as any)[tradingSymbol.long];

  const { loading, data } = usePriceRate(tradingPair.quote, tradingPair.base);
  const [amount, setAmount] = useState(20 as number | undefined);

  return (
    <Container>
      <TradeLine>
        <Text>{tradingSymbol.name}</Text>
        <Text weight="bold">{tradingPair.leverage}×</Text>
      </TradeLine>
      <Separator size={1} />

      <TradeLine>
        <Input
          disabled={!isEnabled || isOpening}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => {
            const number = Number(event.target.value);
            if (number > 0) {
              setAmount(Number(event.target.value));
            } else {
              setAmount(undefined);
            }
          }}
        />
      </TradeLine>

      <TradeButton>
        <BuyButton
          onClick={() => onOpenPosition(tradingSymbol.long, amount, liquidityPool.address)}
          loading={isOpening}
          disabled={!isEnabled}
        >
          Buy
        </BuyButton>
        <SellButton
          onClick={() => onOpenPosition(tradingSymbol.short, amount, liquidityPool.address)}
          loading={isOpening}
          disabled={!isEnabled}
        >
          Sell
        </SellButton>
      </TradeButton>

      <TradePrice>
        <Text weight="bold">
          { (loading || !data) ? '—' : formatRate(data, liquidityPool.spread, tradingSymbol.prefixUSD, tradingSymbol.isJPY, 'ask') }
        </Text>
        <Text weight="bold">
          { (loading || !data) ? '—' : formatRate(data, liquidityPool.spread, tradingSymbol.prefixUSD, tradingSymbol.isJPY, 'bid') }
        </Text>
      </TradePrice>
    </Container>
  );
};

export default Trade;
