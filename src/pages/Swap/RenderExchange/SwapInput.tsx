import React, { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { AmountInput, Select, Text } from '../../../components';
import { TokenInfo } from '../../../services';

type SwapInputProps = {
  label: string;
  tokens: TokenInfo[];
  token?: TokenInfo;
  amount: string;
  disabled?: boolean;
  onChangeToken(token?: TokenInfo): void;
  onChangeAmount(amount: string): void;
  onInput(): void;
};

const SwapInput: React.FC<SwapInputProps> = ({
  label,
  tokens,
  token,
  amount,
  onChangeToken,
  onChangeAmount,
  onInput,
  disabled = false,
}) => {
  const classes = useStyles();

  useLayoutEffect(() => {
    if (tokens.length && !token) {
      onChangeToken(tokens[0]);
    }
  }, [tokens, onChangeToken, token]);

  const select = (
    <Select
      size="large"
      value={token?.id}
      onSelect={tokenId => {
        const token = tokens.find(({ id }) => tokenId === id);
        onChangeToken(token);
      }}
      style={{ width: '12rem' }}
      loading={!tokens.length}
      disabled={!tokens.length}
    >
      {tokens.map(token => (
        <Select.Option value={token.id} key={token.id}>
          {token.name}
        </Select.Option>
      ))}
    </Select>
  );

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <Text>{label}</Text>
      </div>
      <AmountInput
        disabled={disabled}
        value={amount}
        size="large"
        onChange={e => onChangeAmount(e.target.value)}
        onInput={() => onInput()}
        addonAfter={select}
      />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    flex: 1,
  },
  label: {
    'margin-bottom': '1.5rem',
  },
}));

export default SwapInput;
