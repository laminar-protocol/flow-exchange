import React from 'react';
import styled from 'styled-components';

import { CurrencySelect, Input } from 'components';

const InputGroup = Input.Group;

const Container = styled.div`
`;

const AmountInput = styled(Input)`
  &.ant-input {
    font-variant-numeric: tabular-nums;
    width: 60% !important;
    font-size: 1.75rem !important;
    height: 3.5rem !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
`;

const SymbolSelect = styled(CurrencySelect)`
  display: block;
  width: 40%;
  .react-select__control {
    height: 3.5rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const options = (symbols, selected) => {
  if (symbols) {
    return symbols.map((symbol) => ({ symbol, isDisabled: symbol === selected }));
  }
  return [];
};

const Component = ({
  className, disabled, symbols, disabledSymbol, selectedSymbol, onCurrencyChange, onAmountChange,
}) => (
  <Container className={className}>
    <InputGroup compact>
      <AmountInput onChange={onAmountChange} disabled={disabled} />
      <SymbolSelect
        options={options(symbols, disabledSymbol)}
        onChange={(event) => { onCurrencyChange(event.symbol); }}
        value={{ symbol: selectedSymbol }}
        isDisabled={disabled}
        isSearchable={false}
      />
    </InputGroup>
  </Container>
);

export default Component;
