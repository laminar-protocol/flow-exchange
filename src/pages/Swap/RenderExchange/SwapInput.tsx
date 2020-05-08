import React, { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { AmountInput, Select, Text } from '../../../components';
import { TokenInfo } from '../../../services';
import SwapLock from './SwapLock';

type SwapInputProps = {
  label: string;
  tokens: TokenInfo[];
  token?: TokenInfo;
  amount: string;
  disabled?: boolean;
  locked?: boolean;
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
  locked,
  disabled = false,
}) => {
  const classes = useStyles();

  useLayoutEffect(() => {
    if (tokens.length && !token) {
      onChangeToken(tokens[0]);
    }
  }, [tokens, onChangeToken, token]);

  console.log(token?.id);

  const select = (
    <Select
      size="large"
      value={token?.id}
      onSelect={tokenId => {
        const token = tokens.find(({ id }) => tokenId === id);
        onChangeToken(token);
      }}
      className={classes.swapInput}
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
        className={clsx({
          [classes.waitEnable]: locked,
        })}
        addonAfter={select}
        addonBefore={locked ? <SwapLock tokenId={token?.id} /> : null}
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
  swapInput: {
    width: '8rem',
    [theme.breakpoints.down('lg')]: {
      width: 'auto',
    },
  },
  waitEnable: {
    '& .ant-input-group .ant-input-group-addon': {
      width: '100%',
    },
    '& .ant-input-group .ant-input': {
      width: 0,
      'padding-left': '0',
      'padding-right': '0',
      'border-left': 0,
    },
    '& .ant-input-group .ant-input-group-addon:first-child': {
      'line-height': '3rem',
      padding: 0,
    },
  },
}));

export default SwapInput;
