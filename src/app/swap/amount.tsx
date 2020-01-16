import React from 'react';
import styled from 'styled-components';
import InputGroup from 'antd/lib/input/Group';

import { CurrencySelect, Input } from 'components';
import GrantSwitch from 'app/GrantSwitch';
import * as theme from 'theme';

const Container = styled.div``;

const AmountInput = styled(Input)`
  &.ant-input {
    font-variant-numeric: tabular-nums;
    font-weight: ${theme.lightWeight};
    width: 60% !important;
    font-size: 1.75rem !important;
    height: 3.5rem !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    ${theme.respondTo.sm`
      width: 100% !important;
      border-top-right-radius: 0.5rem !important;
      border-bottom-left-radius: 0 !important;

    `}
  }
  &.ant-input-disabled {
    cursor: default !important;
  }
`;

const SymbolSelect = styled(CurrencySelect)`
  display: block;
  width: 40%;

  ${theme.respondTo.sm`
      width: 100%;
      .react-select__control {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0.5rem !important;
        border-top: 0px;
      }
  `}

  .react-select__control {
    height: 3.5rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

// TODO: fix type
const Lock = styled(GrantSwitch as React.FC<any>)`
  position: absolute;
  height: 2.5rem;
  top: 50%;
  left: 0.5rem;
  margin-top: -1.25rem;
  z-index: 168;
  border-radius: 0.5rem !important;

  ${theme.respondTo.sm`
    top: 0.5rem;
    margin-top: 0;
  `}
`;

const options = (symbols: string[], disabledSymbols?: string[]) => {
  if (symbols) {
    return symbols.map(symbol => ({ symbol, isDisabled: disabledSymbols?.includes(symbol) }));
  }
};

interface Props {
  className?: string;
  disabled: boolean;
  symbols: string[];
  disabledSymbols?: string[];
  selectedSymbol: string;
  requireAuthorization?: boolean;
  value?: string;

  onCurrencyChange: (symbol: string) => void;
  onAmountChange: (amount: string) => void;
}

const Amount: React.FC<Props> = ({
  className,
  disabled,
  symbols,
  disabledSymbols,
  selectedSymbol,
  value,
  requireAuthorization,
  onCurrencyChange,
  onAmountChange,
}) => (
  <Container className={className}>
    <InputGroup compact>
      {requireAuthorization && <Lock symbol={selectedSymbol} />}
      <AmountInput
        type="number"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onAmountChange(event.target.value);
        }}
        disabled={disabled}
      />
      <SymbolSelect
        options={options(symbols, disabledSymbols)}
        onChange={(event: any) => {
          onCurrencyChange(event.symbol);
        }}
        value={{ symbol: selectedSymbol }}
        isDisabled={disabled}
        isSearchable={false}
      />
    </InputGroup>
  </Container>
);

export default Amount;
