import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TokenSymbol } from 'config';
import { usePriceRate } from 'hooks/useOraclePrice';
import {
  Text, Separator, PrimaryButton,
} from 'components';
import BalanceLine from 'app/balanceLine/balanceLine.connect';

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
import SwapList from './swapList.connect';
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

  onFromSymbolChange: (symbol: string) => void;
  onToSymbolChange: (symbol: string) => void;
  onFromAmountChange: (amount: string, rate?: number, spread?: number) => void;
  onToAmountChange: (amount: string, rate?: number, spread?: number) => void;
  onSwapSymbol: (fromSymbol: string, toSymbol: string, fromAmount?: string, toAmount?: string) => void;
  onSwap: (isRedeem: boolean) => void;
  onFetchLiquidityPoolSpread: (otherSymbol: string) => void;
}

// ----------

const Swap: React.FC<StateProps> = ({
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
  onFromSymbolChange,
  onToSymbolChange,
  onFromAmountChange,
  onToAmountChange,
  onSwapSymbol,
  onSwap,
  onFetchLiquidityPoolSpread,
}) => {
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
  const {
    loading: isLoadingRate,
    data: rate,
  } = usePriceRate(fromSymbol, toSymbol);

  useEffect(
    () => {
      if (fromAmount && toAmount === undefined) {
        onFromAmountChange(fromAmount, rate, spread);
      }

      if (toAmount && fromAmount === undefined) {
        onToAmountChange(toAmount, rate, spread);
      }
    },
    [onFromAmountChange, onToAmountChange, fromAmount, toAmount, spread, rate],
  );

  // ----------
  // Effects
  // ----------
  useEffect(
    () => onFetchLiquidityPoolSpread(isRedeem ? fromSymbol : toSymbol),
    [onFetchLiquidityPoolSpread, fromSymbol, toSymbol, isRedeem],
  );

  const isLoading = isLoadingSpread || isLoadingRate;

  return (
    <Container>
      <Text size="h">Spot Exchange</Text>
      <Separator />
      <SwapContainer padding={2}>
        <Entry>
          <Currency>
            <Label>
              <Text weight="bold" size="s" light>Send</Text>
            </Label>
            <Amount
              symbols={availableFromSymbols}
              selectedSymbol={fromSymbol}
              onCurrencyChange={onFromSymbolChange}
              onAmountChange={(x) => onFromAmountChange(x, rate, spread)}
              disabled={isSwapping}
              value={fromAmount}
              requireAuthorization={!isRedeem}
            />
            <Validation>
              <ValidationText size="s" />
            </Validation>
          </Currency>
          <Divider>
            <ExchangeIcon onClick={() => { onSwapSymbol(fromSymbol, toSymbol, fromAmount, toAmount); }}>
              <FontAwesomeIcon icon="chevron-right" className="normalIcon" />
              <FontAwesomeIcon icon="exchange-alt" className="swapIcon" />
            </ExchangeIcon>
          </Divider>
          <Currency>
            <Label>
              <Text weight="bold" size="s" light>Recieve</Text>
            </Label>
            <Amount
              symbols={availableToSymbols}
              selectedSymbol={toSymbol}
              onCurrencyChange={onToSymbolChange}
              onAmountChange={(x) => onToAmountChange(x, rate, spread)}
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
            onClick={() => { onSwap(isRedeem); }}
            disabled={!isEnabled}
          >
            Exchange
          </PrimaryButton>
        </ActionBar>
      </SwapContainer>
      <SwapDetail>
        <SwapBalance>
          <Text size="l">Balances</Text>
          <Separator size={1}/>
          {
            availableSymbols.map(symbol => (
              <BalanceLine symbol={symbol} key={symbol} />
            ))
          }
        </SwapBalance>
        <SwapListContainer>
          <SwapList />
        </SwapListContainer>
      </SwapDetail>
    </Container>
  );
};

export default Swap;
