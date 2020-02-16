import numbro from 'numbro';
import React from 'react';

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
  output: 'currency',
  currencyPosition: 'prefix',
  currencySymbol: '',
};

const priceFormatOptions = {
  thousandSeparated: true,
  mantissa: 8,
  trimMantissa: true,
};

const rateFormatOptions = {
  thousandSeparated: true,
  mantissa: 8,
  trimMantissa: false,
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
  <span className={className}>
    {value == null ? '' : numbro(value).format(options ? { ...defaultOptions, ...options } : defaultOptions)}
  </span>
);

export const FormatBalance: React.FC<FormatProps> = props => (
  <Format {...props} defaultOptions={balanceFormatOptions} />
);

export const FormatProfit: React.FC<FormatProps> = props => <Format {...props} defaultOptions={profitFormatOptions} />;

export const FormatPrice: React.FC<FormatProps> = props => <Format {...props} defaultOptions={priceFormatOptions} />;

export const FormatRate: React.FC<FormatProps> = props => {
  const { value } = props;
  if (!value) {
    return <span>—</span>;
  }
  return <Format {...props} defaultOptions={rateFormatOptions} />;
};
