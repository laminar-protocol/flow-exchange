import React from 'react';

import numbro from 'numbro';

const balanceFormatOptions = {
  thousandSeparated: true,
  mantissa: 2,
  trimMantissa: true,
};

const profitFormatOptions = {
  thousandSeparated: true,
  mantissa: 2,
  trimMantissa: true,
  negative: 'parenthesis',
};

const priceFormatOptions = {
  thousandSeparated: true,
  mantissa: 8,
  trimMantissa: true,
};

export interface FormatProps {
  value?: string | number;
  options?: Record<string, any>;
}

export interface FormatExtraProps extends FormatProps {
  defaultOptions: Record<string, any>;
}

export const Format: React.FC<FormatExtraProps> = ({ value, options, defaultOptions }) => (
  <span>{value == null ? '' : numbro(value).format(options ? { ...defaultOptions, ...options } : defaultOptions)}</span>
);

export const FormatBalance: React.FC<FormatProps> = (props) => (
  <Format {...props} defaultOptions={balanceFormatOptions} />
);

export const FormatProfit: React.FC<FormatProps> = (props) => (
  <Format {...props} defaultOptions={profitFormatOptions} />
);

export const FormatPrice: React.FC<FormatProps> = (props) => (
  <Format {...props} defaultOptions={priceFormatOptions} />
);
