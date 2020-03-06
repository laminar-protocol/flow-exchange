import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import {
  FormatRate,
  Input,
  InputNumber,
  Notice,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  SolidButton,
  Text,
} from '../../components';
import { useDispatch, usePriceRate, useShallowEqualSelector } from '../../hooks';
import { theme } from '../../styles';
import { actions } from '../../types';
import { liquidityPools, tradingPairs, tradingSymbols } from '../config';
import { calculateRate } from './rate';

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
    text-align: center;
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

const AmountInput = styled(Input)`
  &.ant-input {
    font-variant-numeric: tabular-nums;
    font-weight: ${theme.lightWeight};
    font-size: 1.5rem !important;
    height: 3rem !important;
  }
  &.ant-input-disabled {
    cursor: default !important;
  }
`;

const SellButton = styled(SolidButton)`
  &.ant-btn,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active {
    background-color: ${theme.sellColor};
    color: ${theme.alwaysWhiteForegroundColor};
  }
`;

const BuyButton = styled(SolidButton)`
  &.ant-btn,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active {
    background-color: ${theme.buyColor};
    color: ${theme.alwaysWhiteForegroundColor};
  }
`;

// ----------
// Interface
// ----------

export type Props = {
  symbol: string;
  pool: string;
};

export type StateProps = {
  isEnabled: boolean;
  isOpening: boolean;
};

// ----------

const Trade: React.FC<Props> = ({ symbol, pool }) => {
  const dispatch = useDispatch();

  // TODO: Fix type
  const tradingSymbol = (tradingSymbols as any)[symbol];
  const liquidityPool = (liquidityPools as any)[pool];
  const tradingPair = (tradingPairs as any)[tradingSymbol.long];

  const { data: rate } = usePriceRate(tradingPair.quote, tradingPair.base);
  const [amount, setAmount] = useState(20 as number | undefined);
  const [displayMode, setModePosition] = useState('basic' as string);

  const { isEnabled, isOpening } = useShallowEqualSelector<AppState, StateProps>(
    ({ margin: { allowance, openPosition } }: AppState) => {
      const allowanceValue = allowance.value || 0;
      return {
        isEnabled: allowanceValue > 0,
        isOpening: openPosition.loading,
      };
    },
  );

  const onOpenPosition = useCallback(
    (name?: string, amount?: number, pool?: string) => {
      if (name === undefined || amount === undefined || pool === undefined) {
        return;
      }
      dispatch(actions.margin.openPosition.requested({ params: { name, amount, pool } }));
    },
    [dispatch],
  );

  const renderAdvanced = () => {
    if (displayMode === 'basic') {
      return;
    }
    return (
      <>
        <Separator size={1} />
        <TradeLine>
          <Notice size="s" light>
            Under Development
          </Notice>
        </TradeLine>
        <Separator size={1} />
        <TradeLine>
          <Text>Buy Limit</Text>
          <InputNumber disabled />
        </TradeLine>
        <TradeLine>
          <Text>Buy Stop</Text>
          <InputNumber disabled />
        </TradeLine>
        <TradeLine>
          <Text>Sell Stop</Text>
          <InputNumber disabled />
        </TradeLine>
        <TradeLine>
          <Text>Sell Limit</Text>
          <InputNumber disabled />
        </TradeLine>
        <TradeLine>
          <Text>Slippage</Text>
          <InputNumber disabled />
        </TradeLine>
        <Separator size={1} />
      </>
    );
  };

  return (
    <Container>
      <SegmentedControl
        defaultValue={displayMode}
        buttonStyle="solid"
        value={displayMode}
        onChange={e => {
          setModePosition(e.target.value);
        }}
      >
        <SegmentedControlItem value="basic">Basic</SegmentedControlItem>
        <SegmentedControlItem value="advanced">Advanced</SegmentedControlItem>
      </SegmentedControl>

      <Separator size={1} />

      <TradeLine>
        <Text>{tradingSymbol.name}</Text>
        <Text weight="bold">{Math.abs(tradingPair.leverage)}×</Text>
      </TradeLine>

      <TradeLine>
        <AmountInput
          disabled={!isEnabled || isOpening}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={event => {
            const number = Number(event.target.value);
            if (number > 0) {
              setAmount(Number(event.target.value));
            } else {
              setAmount(undefined);
            }
          }}
        />
      </TradeLine>

      {renderAdvanced()}

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
          <FormatRate
            value={calculateRate(liquidityPool.spread, tradingSymbol.inverted, 'ask', rate)}
            options={{ mantissa: tradingSymbol.precision }}
          />
        </Text>
        <Text weight="bold">
          <FormatRate
            value={calculateRate(liquidityPool.spread, tradingSymbol.inverted, 'bid', rate)}
            options={{ mantissa: tradingSymbol.precision }}
          />
        </Text>
      </TradePrice>
    </Container>
  );
};

export default Trade;