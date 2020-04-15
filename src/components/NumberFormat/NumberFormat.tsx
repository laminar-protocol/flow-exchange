import React from 'react';
import numbro from 'numbro';
import { fromPrecision } from '../../utils';

import { BaseProps } from '../../types';

type NumberFormatProps = {
  percent?: boolean;
  options?: Record<string, any>;
  value: number | string;
  precision?: number | boolean;
};

const NumberFormat: React.FC<BaseProps & NumberFormatProps> = ({
  component: Component = 'span',
  precision,
  value: _value,
  percent = false,
  options = {},
  ...other
}) => {
  const formatOptions: Record<string, any> = {};
  const value = !precision
    ? _value
    : fromPrecision(_value, typeof precision === 'number' ? precision : 18, { pad: false, commify: false });

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

export default NumberFormat;
