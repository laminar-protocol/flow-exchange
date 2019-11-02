import React from 'react';
import styled from 'styled-components';

import { CurrencySelect, Input } from 'components';
import InputGroup from 'antd/lib/input/Group';
import GrantSwitch from 'app/grantSwitch/grantSwitch.connect';

import * as theme from 'theme';

const Container = styled.div`
`;

const AmountInput = styled(Input)`
  &.ant-input {
    font-variant-numeric: tabular-nums;
    font-weight: ${theme.lightWeight};
    width: 60% !important;
    font-size: 1.75rem !important;
    height: 3.5rem !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  &.ant-input-disabled {
    cursor: default !important;
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

const Lock = styled(GrantSwitch)`
  position: absolute;
  height: 2.5rem;
  top: 50%;
  left: 0.5rem;
  margin-top: -1.25rem;
  z-index: 168;
  border-radius: 0.5rem !important;
`;

const options = (symbols: string[], selected: string) =>
  symbols.map((symbol) => ({ symbol, isDisabled: symbol === selected }));

export interface Props {
  className?: string;
  disabled?: boolean;
  symbols: string[];
  disabledSymbol: string;
  selectedSymbol: string;
  requireAuthorization?: boolean;
  onCurrencyChange: (symbol: string) => void;
  onAmountChange: (val: string) => void;
}

const CurrencyInput: React.FC<Props> = ({
  className,
  disabled,
  symbols,
  disabledSymbol,
  selectedSymbol,
  requireAuthorization,
  onCurrencyChange,
  onAmountChange,
}) => (
  <Container className={className}>
    <InputGroup compact>
      { requireAuthorization && <Lock symbol={selectedSymbol} /> }
      <AmountInput onChange={(e) => onAmountChange(e.target.value)} disabled={disabled} />
      <SymbolSelect
        options={options(symbols, disabledSymbol)}
        onChange={(event: any) => { onCurrencyChange(event.symbol); }}
        value={{ symbol: selectedSymbol }}
        isDisabled={disabled}
        isSearchable={false}
      />
    </InputGroup>
  </Container>
);

export default CurrencyInput;
