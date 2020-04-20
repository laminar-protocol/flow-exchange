import React, { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { AmountInput, Select, Text } from '../../../components';
import { TokenInfo } from '../../../services';

type SwapInputProps = {
  label: string;
  tokens: TokenInfo[];
  tokenId: string;
  amount: string;
  disabled?: boolean;
  onChangeTokenId(tokenId: TokenInfo['id']): void;
  onChangeAmount(amount: string): void;
  onInput(): void;
};

const SwapInput: React.FC<SwapInputProps> = ({
  label,
  tokens,
  tokenId,
  amount,
  onChangeTokenId,
  onChangeAmount,
  onInput,
  disabled = false,
}) => {
  const classes = useStyles();

  useLayoutEffect(() => {
    if (tokens.length && !tokenId) {
      onChangeTokenId(tokens[0].id);
    }
  }, [tokens]);

  const select = (
    <Select
      size="large"
      value={tokenId}
      onSelect={value => onChangeTokenId(value as TokenInfo['id'])}
      style={{ width: '12rem' }}
      loading={!tokens.length}
      disabled={!tokens.length}
    >
      {tokens.map(token => (
        <Select.Option value={token.id} key={token.id}>
          {token.id}
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
