import React from 'react';
import NumberInputComp from 'react-number-format';

interface Props {
  value?: number | string;
  noPrefix?: boolean;
  prefix?: string;
  children?: React.ReactNode;
}

const NumberInput: React.FC<Props> = ({ value, noPrefix, prefix, children }) => (
  <NumberInputComp
    value={value}
    displayType="text"
    thousandSeparator
    prefix={noPrefix ? undefined : prefix || '$'}
    decimalScale={6}
    fixedDecimalScale
  >
    {children}
  </NumberInputComp>
);

export default NumberInput;
