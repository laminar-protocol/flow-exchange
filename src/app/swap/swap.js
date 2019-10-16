import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Text, Separator, Panel, PrimaryButton,
} from 'components';
import * as theme from 'theme';

import CurrencyInput from './currencyInput';

const Container = styled.div`
`;

const Swap = styled(Panel)`
`;

const Currency = styled.div`
  flex: 1;
`;

const Exchange = styled.div`
  margin: 0 2rem;
`;

const Entry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ExchangeIcon = styled(FontAwesomeIcon)`
  color: ${theme.lightForegroundColor};
  font-size: 2rem;
`;

const Component = ({
  symbols, swap, onFromSymbolChange, onToSymbolChange, onFromAmountChange, onSwap,
}) => (
  <Container>
    <Text size="h">Spot Exchange</Text>
    <Separator />
    <Swap padding={2}>
      <Entry>
        <Currency>
          <Text light weight="bold">Send</Text>
          <CurrencyInput
            symbols={symbols.symbols}
            selected={swap.fromSymbol}
            onCurrencyChange={(e) => { onFromSymbolChange(e); }}
            onAmountChange={(e) => { onFromAmountChange(e.target.value); }}
            disabled={swap.isSwapping}
          />
        </Currency>
        <Exchange>
          <ExchangeIcon icon="exchange-alt" />
        </Exchange>
        <Currency>
          <Text light weight="bold">Receive</Text>
          <CurrencyInput
            symbols={symbols.symbols}
            selected={swap.toSymbol}
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

export default Component;
