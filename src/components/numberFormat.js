import React from 'react';
import NumberFormat from 'react-number-format';

const Component = ({ value, children }) => (
  <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" decimalScale={2} fixedDecimalScale>
    { children }
  </NumberFormat>
);

export default Component;
