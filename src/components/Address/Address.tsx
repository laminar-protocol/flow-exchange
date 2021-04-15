import React from 'react';

import { BaseProps } from '../../types';
import { truncate } from '../../utils';

type AddressProps = {
  value: string;
  maxLength?: number;
};

const Address: React.FC<AddressProps & BaseProps & React.HTMLProps<HTMLSpanElement>> = ({
  component: Component = 'span',
  maxLength,
  value,
  ...other
}) => {
  //@ts-ignore
  return <Component {...other}>{maxLength ? truncate(value, maxLength) : value}</Component>;
};

export default Address;
