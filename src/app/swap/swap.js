import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Text, Separator, Panel, PrimaryButton, Spinner, NumberFormat,
} from 'components';
import * as theme from 'theme';
import { getSymbols } from 'reducers/market.reducer';
import { caculateRate } from 'reducers/swap.reducer';

import CurrencyInput from './currencyInput';

const Container = styled.div`
`;

const Swap = styled(Panel)`
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

const Component = ({
  market,
  swap,
  spotRate,
  onFromSymbolChange,
  onToSymbolChange,
  onFromAmountChange,
  onToAmountChange,
  onSwap,
  onSwapSymbol,
}) => {
  // Attributes
  const availableSymbols = getSymbols(market.symbols).map((s) => s.symbol);
  const {
    fromSymbol,
    toSymbol,
    isValid,
    rate,
    isRedeem,
    isSwapping,
    validationErrors,
  } = swap;
  const { isQuerying } = spotRate;
  const swapEnabled = isValid;
  const isLoading = isQuerying;

  // Function
  const renderExchangeRate = () => {
    if (isEmpty(rate)) {
      return null;
    }

    const exchangeRate = caculateRate(rate, isRedeem);

    return (
      <Text light>
        <strong>1</strong>
        {fromSymbol}
        &nbsp;=&nbsp;
        <strong><NumberFormat value={exchangeRate} noPrefix /></strong>
        {toSymbol}
      </Text>
    );
  };

  return (
    <Container>
      <Text size="h">Spot Exchange</Text>
      <Separator />
      <Swap padding={2}>
        <Entry>
          <Currency>
            <Label>
              <Text weight="bold" size="s" light>Send</Text>
            </Label>
            <CurrencyInput
              symbols={availableSymbols}
              selectedSymbol={fromSymbol}
              disabledSymbol={toSymbol}
              onCurrencyChange={(e) => { onFromSymbolChange(e); }}
              onAmountChange={(e) => { onFromAmountChange(e.target.value); }}
              disabled={isSwapping}
              requireAuthorization
            />
            <Validation>
              <ValidationText size="s">
                {validationErrors.fromAmount}
              </ValidationText>
            </Validation>
          </Currency>
          <Divider>
            <ExchangeIcon onClick={() => { onSwapSymbol(fromSymbol, toSymbol); }}>
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
              onCurrencyChange={(e) => { onToSymbolChange(e); }}
              onAmountChange={(e) => { onToAmountChange(e.target.value); }}
              disabled={isSwapping}
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
      </Swap>
    </Container>
  );
};

export default Component;
