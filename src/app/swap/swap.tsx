import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Text, Separator, Panel, PrimaryButton, Spinner, NumberFormat,
} from 'components';
import * as theme from 'theme';
import { tokens, isTokenSymbol } from 'config';
import { usePriceRate } from 'hooks/useOraclePrice';

import CurrencyInput from './currencyInput';

const Container = styled.div`
`;

const SwapContainer = styled(Panel)`
`;

const Currency = styled.div`
  flex: 1;
  align-self: stretch;
`;

const Label = styled.div`
  height: 1.5rem;
`;

const Validation = styled.div`
  height: 1.5rem;
  display: flex;
  align-items: flex-end;
`;

const ValidationText = styled(Text)`
  color: ${theme.errorForegroundColor};
`;

const Entry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${theme.respondTo.lg`
    flex-direction: column;
  `};
`;

const Divider = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.respondTo.lg`
    margin-top: 0rem;
    margin-bottom: 0rem;
  `};
`;

const ExchangeIcon = styled.div`
  color: ${theme.lightForegroundColor};
  font-size: 1.75rem;
  height: 3rem;
  width: 3rem;
  line-height: 3rem;
  text-align: center;
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px ${theme.borderColor};
      .normalIcon {
        display: none;
      }
      .swapIcon {
        display: inline;
      }
  }
  &:active {
    box-shadow: 0 0 0 1px ${theme.darkBorderColor};
  }
  .swapIcon {
    display: none;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Detail = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
`;

const symbolName = (symbol: string) => {
  if (isTokenSymbol(symbol)) {
    return tokens[symbol].name;
  }
  return symbol;
};

const Swap: React.FC = ({
  swap,
  spread,
  onFromSymbolChange,
  onToSymbolChange,
  onFromAmountChange,
  onToAmountChange,
  onSwap,
  onSwapSymbol,
  fetchLiquidityPoolSpread,
}: any) => {
  const availableSymbols = Object.keys(tokens);
  const {
    fromSymbol,
    toSymbol,
    isValid,
    isRedeem,
    isSwapping,
    validationErrors,
    fromAmount,
    toAmount,
  } = swap;

  const { loading, data: rate } = usePriceRate(fromSymbol, toSymbol);

  useEffect(
    () =>
      fetchLiquidityPoolSpread(isRedeem ? fromSymbol : toSymbol),
    [fetchLiquidityPoolSpread, fromSymbol, toSymbol, isRedeem],
  );

  useEffect(
    () => {
      if (fromAmount) {
        onFromAmountChange(fromAmount, rate);
      }
    },
    [onFromAmountChange, fromAmount, rate],
  );

  useEffect(
    () => {
      if (toAmount && !fromAmount) {
        onToAmountChange(toAmount, rate);
      }
    },
    [onToAmountChange, fromAmount, toAmount, rate],
  );

  const swapEnabled = isValid;
  const isLoading = loading || spread.loading;

  const askSpread = spread.value && spread.value.ask;
  const bidSpread = spread.value && spread.value.bid;

  // Function
  const renderExchangeRate = () => {
    if (rate == null || askSpread == null || bidSpread == null) {
      return null;
    }
    const adjuestment = isRedeem ? 1 - bidSpread : 1 - askSpread;
    const finalRate = rate * adjuestment;

    return (
      <Text light>
        <strong>1</strong>
        &nbsp;{symbolName(fromSymbol)}
        &nbsp;=&nbsp;
        <strong><NumberFormat value={finalRate} noPrefix /></strong>
        &nbsp;{symbolName(toSymbol)}
      </Text>
    );
  };

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
            <CurrencyInput
              symbols={availableSymbols}
              selectedSymbol={fromSymbol}
              disabledSymbol={toSymbol}
              onCurrencyChange={onFromSymbolChange}
              onAmountChange={(x) => onFromAmountChange(x, rate)}
              disabled={isSwapping}
              requireAuthorization
              value={fromAmount}
            />
            <Validation>
              <ValidationText size="s">
                {validationErrors.fromAmount}
              </ValidationText>
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
            <CurrencyInput
              symbols={availableSymbols}
              selectedSymbol={toSymbol}
              disabledSymbol={fromSymbol}
              onCurrencyChange={onToSymbolChange}
              onAmountChange={(x) => onToAmountChange(x, rate)}
              disabled={isSwapping}
              value={toAmount}
            />
            <Validation>
              <ValidationText size="s">
                {validationErrors.toAmount}
              </ValidationText>
            </Validation>
          </Currency>
        </Entry>
        <Separator />
        <ActionBar>
          <Detail>
            {isLoading && <Spinner loading={isLoading} /> }
            {!isLoading && renderExchangeRate() }
          </Detail>
          <PrimaryButton
            size="large"
            loading={isSwapping}
            onClick={() => { onSwap(isRedeem); }}
            disabled={!swapEnabled}
          >
            Exchange
          </PrimaryButton>
        </ActionBar>
      </SwapContainer>
    </Container>
  );
};

export default Swap;
