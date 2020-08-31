import React from 'react';
import numbro from 'numbro';
import { fixed18toNumber } from '@laminar/api/utils';

import { BaseProps } from '../../types';

type Fixed18Props = {
  percent?: boolean;
  options?: Record<string, any>;
  value: string;
  precision?: boolean;
};

const Fixed18: React.FC<BaseProps & Fixed18Props> = ({
  component: Component = 'span',
  value: _value,
  percent = false,
  options = {
    roundingFunction: Math.floor,
  },
  ...other
}) => {
  if (_value === undefined) return null;

  const formatOptions: Record<string, any> = {};
  const value = fixed18toNumber(_value);

  if (percent) {
    formatOptions.output = 'percent';
  }

  let showValue: string;

  try {
    showValue = numbro(value).format({
      ...formatOptions,
      ...options,
    });
  } catch {
    showValue = '-';
  }

  return <Component {...other}>{showValue}</Component>;
};

export default Fixed18;
