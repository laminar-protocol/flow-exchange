import React, { useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { swapDispatcher, swapSelector } from './swap.connect';
import { TokenSymbol } from '../../config';
import { Text, Separator, PrimaryButton } from '../../components';
import BalanceLine from '../BalanceLine';
import { AppState } from '../../reducers';
import { usePriceRate, useDispatch, useShallowEqualSelector } from '../../hooks';

import {
  Container,
  SwapContainer,
  Entry,
  Currency,
  Label,
  Divider,
  ExchangeIcon,
  Validation,
  ValidationText,
  ActionBar,
  Detail,
  SwapDetail,
  SwapBalance,
  SwapListContainer,
} from './swap.style';
import Amount from './amount';
import SwapList from './swapList';
import ExchangeRate from './exchangeRate';

// ----------
// Interface
// ----------

export interface StateProps {
  askSpread?: number;
  bidSpread?: number;

  availableSymbols: TokenSymbol[];
  availableFromSymbols: TokenSymbol[];
  availableToSymbols: TokenSymbol[];

  fromSymbol: TokenSymbol;
  toSymbol: TokenSymbol;
  fromAmount?: string;
  toAmount?: string;

  isSwapping: boolean;
  isValid: boolean;
  isRedeem: boolean;

  isLoadingSpread: boolean;
}

// ----------

const Swap: React.FC = () => {
  const dispatch = useDispatch();

  const {
    askSpread,
    bidSpread,
    availableSymbols,
    availableFromSymbols,
    availableToSymbols,
    fromSymbol,
    toSymbol,
    fromAmount,
    toAmount,
    isSwapping,
    isValid,
    isRedeem,
    isLoadingSpread,
  } = useShallowEqualSelector<AppState, StateProps>(swapSelector);

  const {
    onFromSymbolChange,
    onToSymbolChange,
    onFromAmountChange,
    onToAmountChange,
    onSwapSymbol,
    onSwap,
    onFetchLiquidityPoolSpread,
  } = useMemo(() => swapDispatcher(dispatch), [dispatch]);

  // ----------
  // State
  // ----------
  const isEnabled = isValid && !isSwapping;
  let spread: number | undefined;
  if (bidSpread && askSpread) {
    spread = isRedeem ? bidSpread : askSpread;
  }

  // ----------
  // Hooks
  // ----------
  const { loading: isLoadingRate, data: rate } = usePriceRate(fromSymbol, toSymbol);

  useEffect(() => {
    if (fromAmount && toAmount === undefined) {
      onFromAmountChange(fromAmount, rate, spread);
    }

    if (toAmount && fromAmount === undefined) {
      onToAmountChange(toAmount, rate, spread);
    }
  }, [onFromAmountChange, onToAmountChange, fromAmount, toAmount, spread, rate]);

  // ----------
  // Effects
  // ----------
  useEffect(() => onFetchLiquidityPoolSpread(isRedeem ? fromSymbol : toSymbol), [
    onFetchLiquidityPoolSpread,
    fromSymbol,
    toSymbol,
    isRedeem,
  ]);

  const isLoading = isLoadingSpread || isLoadingRate;

  return (
    <Container>
      <Text size="h">Spot Exchange</Text>
      <Separator />
      <SwapContainer padding={2}>
        <Entry>
          <Currency>
            <Label>
              <Text weight="bold" size="s" light>
                Send
              </Text>
            </Label>
            <Amount
              symbols={availableFromSymbols}
              selectedSymbol={fromSymbol}
              onCurrencyChange={onFromSymbolChange}
              onAmountChange={x => onFromAmountChange(x, rate, spread)}
              disabled={isSwapping}
              value={fromAmount}
              requireAuthorization={!isRedeem}
            />
            <Validation>
              <ValidationText size="s" />
            </Validation>
          </Currency>
          <Divider>
            <ExchangeIcon
              onClick={() => {
                onSwapSymbol(fromSymbol, toSymbol, fromAmount, toAmount);
              }}
            >
              <FontAwesomeIcon icon="chevron-right" className="normalIcon" />
              <FontAwesomeIcon icon="exchange-alt" className="swapIcon" />
            </ExchangeIcon>
          </Divider>
          <Currency>
            <Label>
              <Text weight="bold" size="s" light>
                Recieve
              </Text>
            </Label>
            <Amount
              symbols={availableToSymbols}
              selectedSymbol={toSymbol}
              onCurrencyChange={onToSymbolChange}
              onAmountChange={x => onToAmountChange(x, rate, spread)}
              disabled={isSwapping}
              value={toAmount}
            />
            <Validation>
              <ValidationText size="s" />
            </Validation>
          </Currency>
        </Entry>
        <Separator />
        <ActionBar>
          <Detail>
            <ExchangeRate
              isLoading={isLoading}
              spread={spread}
              rate={rate}
              fromSymbol={fromSymbol}
              toSymbol={toSymbol}
            />
          </Detail>
          <PrimaryButton
            size="large"
            loading={isSwapping}
            onClick={() => {
              onSwap(isRedeem);
            }}
            disabled={!isEnabled}
          >
            Exchange
          </PrimaryButton>
        </ActionBar>
      </SwapContainer>
      <SwapDetail>
        <SwapBalance>
          <Text size="l">Balances</Text>
          <Separator size={1} />
          {availableSymbols.map(symbol => (
            <BalanceLine symbol={symbol} key={symbol} />
          ))}
        </SwapBalance>
        <SwapListContainer>
          <SwapList />
        </SwapListContainer>
      </SwapDetail>
    </Container>
  );
};

export default Swap;
