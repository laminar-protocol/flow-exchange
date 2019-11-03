import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import * as theme from 'theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isTokenSymbol, tokens } from 'config';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const CurrencySelect = styled(Select)`
  .react-select__control {
    background-color: ${theme.whiteForegroundColor};
    border: 1px solid ${theme.borderColor};
    border-radius: 0.5rem;
    box-shadow: none;
  }
  .react-select__control:hover {
    border: 1px solid ${theme.darkBorderColor};
  }
  .react-select__menu {
    background-color: ${theme.whiteForegroundColor};
    box-shadow: 0 3px 15px hsla(0,0%,0%,0.05) !important;
    border: 1px solid ${theme.borderColor};
  }
  .react-select__menu-list {

  }
`;

// Custom Components for Select
const CustomPlaceholder = styled.div`
  color: ${theme.lightForegroundColor};
`;
const Placeholder = () => <CustomPlaceholder>Select...</CustomPlaceholder>;

const CustomSingleValue = styled.div`
`;


const SingleValue: React.FC<any> = ({ innerProps, data }) => (
  <CustomSingleValue {...innerProps}>
    <Currency symbol={data.symbol} />
  </CustomSingleValue>
);

const CustomIndicatorSeparator = styled.span`
  background-color: ${theme.borderColor};
  color: ${theme.borderColor};
  align-self: stretch;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  width: 1px;
`;

const IndicatorSeparator: React.FC<any> = ({ innerProps }) => <CustomIndicatorSeparator {...innerProps} />;

const CustomOption = styled.div`
  border-bottom: 1px solid ${theme.borderColor};
  padding: 0.5rem 1rem;
  color: ${theme.foregroundColor};
  cursor: pointer;
  &:hover{
    background-color: ${theme.fadeForegroundColor};
  }
  &:last-child {
    border-bottom: 0;
  }
`;
const Option: React.FC<any> = ({ innerProps, data }) => (
  <CustomOption {...innerProps}>
    <Currency symbol={data.symbol} isDisabled={data.isDisabled} />
  </CustomOption>
);

// Custom Symbol Display
const symbolIcon = (symbol: string): IconProp => {
  if (isTokenSymbol(symbol)) {
    return tokens[symbol].icon;
  }
  return 'money-bill';
};

const symbolName = (symbol: string) => {
  if (isTokenSymbol(symbol)) {
    return tokens[symbol].displayName;
  }
  return symbol;
};

const CustomCurrency = styled.div<{ isDisabled: boolean }>`
  color: ${theme.foregroundColor};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  font-weight: ${theme.normalWeight};
  font-size: 1.25rem;
  .icon {
    color: ${theme.lightForegroundColor};
    width: 1.5rem;
  }
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
`;

const Currency: React.FC<any> = ({ symbol, isDisabled }) => (
  <CustomCurrency isDisabled={isDisabled}>
    <div className="icon">
      <FontAwesomeIcon icon={symbolIcon(symbol)} />
    </div>
    <div className="text">
      {symbolName(symbol)}
    </div>
  </CustomCurrency>
);

const CurrencySelectComponent: React.FC<any> = ({ ...props }) => (
  <CurrencySelect
    classNamePrefix="react-select"
    components={{
      SingleValue, Placeholder, IndicatorSeparator, Option,
    }}
    isSearchable={false}
    {...props}
  />
);

export default CurrencySelectComponent;
