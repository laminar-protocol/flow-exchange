import React from 'react';
import NumberFormat from 'react-number-format';

const Component = ({
  value, noPrefix, prefix, children,
}) => (
  <NumberFormat
    value={value}
    displayType="text"
    thousandSeparator
    prefix={noPrefix ? null : (prefix || '$')}
    decimalScale={2}
    fixedDecimalScale
  >
    { children }
  </NumberFormat>
);

export default Component;
