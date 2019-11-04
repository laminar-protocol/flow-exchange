import React from 'react';

import numbro from 'numbro';

const balanceFormatOptions = {
  thousandSeparated: true,
  mantissa: 2,
  trimMantissa: true,
  currencyPosition: 'prefix',
  currencySymbol: '',
};

const profitFormatOptions = {
  thousandSeparated: true,
  mantissa: 2,
  trimMantissa: true,
  negative: 'parenthesis',
  output: 'currency',
  currencyPosition: 'prefix',
  currencySymbol: '',
};

const priceFormatOptions = {
  thousandSeparated: true,
  mantissa: 8,
  trimMantissa: true,
};

export interface FormatProps {
  value?: string | number;
  options?: Record<string, any>;
  className?: string;
}

export interface FormatExtraProps extends FormatProps {
  defaultOptions: Record<string, any>;
}

export const Format: React.FC<FormatExtraProps> = ({ value, options, className, defaultOptions }) => (
  <span className={className}>{value == null ? '' : numbro(value).format(options ? { ...defaultOptions, ...options } : defaultOptions)}</span>
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
