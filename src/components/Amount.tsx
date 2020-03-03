import BN from 'bn.js';
import React from 'react';

import { TokenInfo } from '../services/Api';
import { fromPrecision, getCurrencySymbol } from '../utils';

function numberToAmount(
  number: BN,
  {
    postfix = '',
    prefix = '',
    minDigits = 3,
    precision = 0,
    useGrouping = true,
  }: {
    postfix?: string;
    prefix?: string;
    precision?: number;
    useGrouping?: boolean;
    minDigits?: number;
  } = {},
) {
  const value = fromPrecision(number, precision, { pad: true, minDigits, commify: useGrouping });

  return `${prefix}${value}${postfix ? ' ' : ''}${postfix}`;
}

export default function Amount(props: {
  value: BN | string | number;
  token: TokenInfo;
  minDigits?: number;
  useGrouping?: boolean;
  hasPostfix?: boolean;
  hasPrefix?: boolean;
  component?: React.ElementType;
}) {
  const {
    value,
    token,
    minDigits = 3,
    useGrouping = true,
    hasPostfix = false,
    hasPrefix = false,
    component: Component = 'span',
    ...other
  } = props;

  const options: any = {
    precision: token.precision,
    useGrouping,
    minDigits,
  };

  if (hasPostfix) options.postfix = token.name;
  if (hasPrefix) options.prefix = getCurrencySymbol(token.id);

  const number = BN.isBN(value) ? value : new BN(value);

  return <Component {...other}>{numberToAmount(number, options)}</Component>;
}
