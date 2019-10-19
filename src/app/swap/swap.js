import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Text, Separator, Panel, PrimaryButton,
} from 'components';
import * as theme from 'theme';
import { fromWei } from 'helpers/unitHelper';

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

const Component = ({
  token, market, swap, onFromSymbolChange, onToSymbolChange, onFromAmountChange, onSwap,
}) => {
  const availableSymbols = market.symbols.map((s) => s.symbol);

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
              selectedSymbol={swap.fromSymbol}
              disabledSymbol={swap.toSymbol}
              onCurrencyChange={(e) => { onFromSymbolChange(e); }}
              onAmountChange={(e) => { onFromAmountChange(e.target.value); }}
              disabled={swap.isSwapping}
              requireAuthorization
            />
            <Validation>
              <ValidationText size="s">&nbsp;</ValidationText>
            </Validation>
          </Currency>
          <Divider>
            <ExchangeIcon>
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
              selectedSymbol={swap.toSymbol}
              disabledSymbol={swap.fromSymbol}
              onCurrencyChange={(e) => { onToSymbolChange(e); }}
              disabled={swap.isSwapping}
            />
          </Currency>
        </Entry>
        <Separator />
        <PrimaryButton
          size="large"
          loading={swap.isSwapping}
          onClick={() => { onSwap(); }}
        >
          Exchange
        </PrimaryButton>
      </Swap>
    </Container>
  );
};

export default Component;
