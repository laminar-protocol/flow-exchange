import React from 'react';
import numbro from 'numbro';

import { BaseProps } from '../../types';

type NumberFormatProps = {
  percent?: boolean;
  options?: Record<string, any>;
  value: number;
  precision?: boolean;
};

const NumberFormat: React.FC<BaseProps & NumberFormatProps> = ({
  component: Component = 'span',
  value,
  percent = false,
  options = {
    roundingFunction: Math.floor,
  },
  ...other
}) => {
  if (value === undefined) return null;

  const formatOptions: Record<string, any> = {};

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
