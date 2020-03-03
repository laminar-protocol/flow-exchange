import React from 'react';
import styled from 'styled-components';

import { CurrencySelect, Input, InputGroup } from '../../components';
import { TokenInfo } from '../../services/Api';
import { theme } from '../../styles';

const options = (tokens: TokenInfo[], disabledTokens?: TokenInfo[]) => {
  if (tokens) {
    return tokens.map(token => ({ token, isDisabled: disabledTokens?.includes(token) }));
  }
};

interface Props {
  className?: string;
  disabled: boolean;
  tokens: TokenInfo[];
  disabledTokens?: TokenInfo[];
  selectedToken: TokenInfo;
  requireAuthorization?: boolean;
  value?: string;

  onCurrencyChange: (token: TokenInfo) => void;
  onAmountChange: (amount: string) => void;
}

const Amount: React.FC<Props> = ({
  className,
  disabled,
  tokens,
  disabledTokens,
  selectedToken,
  value,
  onCurrencyChange,
  onAmountChange,
}) => (
  <Container className={className}>
    <InputGroup compact>
      <Input
        className="amount-input"
        type="number"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onAmountChange(event.target.value);
        }}
        disabled={disabled}
      />
      <CurrencySelect
        className="token-select"
        options={options(tokens, disabledTokens)}
        onChange={(event: any) => {
          onCurrencyChange(event.token);
        }}
        value={{ token: selectedToken }}
        isDisabled={disabled}
        isSearchable={false}
      />
    </InputGroup>
  </Container>
);

const Container = styled.div`
  .ant-input-group {
    display: flex;
  }

  .amount-input {
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
  }

  .token-select {
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
  }

  .lock {
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
  }
`;

export default Amount;
