import React from 'react';
import NumberFormatComp from 'react-number-format';

interface Props {
  value?: number | string;
  noPrefix?: boolean;
  prefix?: string;
  children?: React.ReactNode;
}

const NumberFormat = ({
  value, noPrefix, prefix, children,
}: Props) => (
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
