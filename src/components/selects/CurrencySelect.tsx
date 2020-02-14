import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import * as theme from 'theme';

import { Token } from '../../services/types';
import { Icon } from '../icon';

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
    box-shadow: 0 3px 15px hsla(0, 0%, 0%, 0.05) !important;
    border: 1px solid ${theme.borderColor};
  }
  .react-select__menu-list {
  }
`;

const CustomPlaceholder = styled.div`
  color: ${theme.lightForegroundColor};
`;
const Placeholder = () => <CustomPlaceholder>Select...</CustomPlaceholder>;

const SingleValue: React.FC<{ innerProps: any; data: { token: Token } }> = ({ innerProps, data }) => (
  <div {...innerProps}>
    <Currency token={data.token} />
  </div>
);

const CustomIndicatorSeparator = styled.span`
  background-color: ${theme.borderColor};
  color: ${theme.borderColor};
  align-self: stretch;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  width: 1px;
`;

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
    width: 1.75rem;
  }
  opacity: ${props => (props.isDisabled ? 0.5 : 1)};
`;

const IndicatorSeparator: React.FC<any> = ({ innerProps }) => <CustomIndicatorSeparator {...innerProps} />;

const CustomOption = styled.div`
  border-bottom: 1px solid ${theme.borderColor};
  padding: 0.5rem 1rem;
  color: ${theme.foregroundColor};
  cursor: pointer;
  &:hover {
    background-color: ${theme.fadeForegroundColor};
  }
  &:last-child {
    border-bottom: 0;
  }
`;

const Option: React.FC<{ innerProps: any; data: { token: Token; isDisabled: boolean } }> = ({ innerProps, data }) => (
  <CustomOption {...innerProps}>
    <Currency token={data.token} isDisabled={data.isDisabled} />
  </CustomOption>
);

const Currency: React.FC<{ token: Token; isDisabled?: boolean }> = ({ token, isDisabled = false }) => (
  <CustomCurrency isDisabled={isDisabled}>
    <div className="icon">
      <Icon icon={token.icon} />
    </div>
    <div className="text">{token.displayName}</div>
  </CustomCurrency>
);

const CurrencySelectComponent: React.FC<any> = ({ ...props }) => (
  <CurrencySelect
    classNamePrefix="react-select"
    components={{
      SingleValue,
      Placeholder,
      IndicatorSeparator,
      Option,
    }}
    isSearchable={false}
    {...props}
  />
);

export default CurrencySelectComponent;
