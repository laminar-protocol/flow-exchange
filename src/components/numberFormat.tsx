import React from 'react';
import NumberFormatComp from 'react-number-format';

interface Props {
  value?: number | string;
  noPrefix?: boolean;
  prefix?: string;
  children?: React.ReactNode;
}

const NumberFormat: React.FC<Props> = ({
  value, noPrefix, prefix, children,
}) => (
  <NumberFormatComp
    value={value}
    displayType="text"
    thousandSeparator
    prefix={noPrefix ? undefined : (prefix || '$')}
    decimalScale={2}
    fixedDecimalScale
  >
    { children }
  </NumberFormatComp>
);

export default NumberFormat;
