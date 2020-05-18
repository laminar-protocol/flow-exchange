import BN from 'bn.js';
import React from 'react';

import { useTokenInfo } from '../../hooks';
import { TokenInfo } from '../../services/Api';
import { fromPrecision, getCurrencySymbol, getValueFromHex } from '../../utils';
import { Spinner } from '../Spinner';
import { BaseProps } from '../../types';
import { toPrecision } from '../../utils';

type NumberToAmountOptions = {
  postfix?: string;
  prefix?: string;
  precision?: number;
  useGrouping?: boolean;
  mantissa?: number;
};

type AmountProps = {
  value?: BN | string;
  tokenId?: TokenInfo['id'];
  mantissa?: number;
  useGrouping?: boolean;
  hasPostfix?: boolean;
  hasPrefix?: boolean;
  loading?: boolean;
  withPrecision?: boolean;
} & BaseProps;

const numberToAmount = (
  number: BN,
  { postfix = '', prefix = '', mantissa = 3, precision = 0, useGrouping = true }: NumberToAmountOptions = {},
) => {
  const value = fromPrecision(number, precision, { pad: true, mantissa, commify: useGrouping });

  return `${prefix}${value}${postfix ? ' ' : ''}${postfix}`;
};

const Amount: React.FC<AmountProps> = React.memo(props => {
  const {
    value,
    tokenId,
    mantissa = 3,
    useGrouping = true,
    hasPostfix = false,
    hasPrefix = false,
    loading = false,
    withPrecision = false,
    component: Component = 'span',
    ...other
  } = props;

  const token = useTokenInfo(tokenId);

  if (loading) return <Spinner />;
  if (value === undefined) return null;

  const options: NumberToAmountOptions = {
    useGrouping,
    mantissa,
    precision: 18,
  };

  if (token) {
    options.precision = token.precision;
    if (hasPostfix) options.postfix = token.name;
    if (hasPrefix) options.prefix = getCurrencySymbol(token.id);
  }

  let quantity = value;

  if (withPrecision) {
    quantity = toPrecision(quantity as string, 18);
  }

  const number = BN.isBN(quantity) ? (quantity as BN) : new BN(getValueFromHex(quantity));

  return <Component {...other}>{numberToAmount(number, options)}</Component>;
});

export default Amount;
