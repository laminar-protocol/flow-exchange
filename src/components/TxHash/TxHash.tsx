import React from 'react';

import { BaseProps } from '../../types';
import { truncate } from '../../utils';

type TxHashProps = {
  value: string;
  maxLength?: number;
};

const TxHash: React.FC<TxHashProps & BaseProps & React.HTMLProps<HTMLSpanElement>> = ({
  component: Component = 'span',
  maxLength,
  value,
  ...other
}) => {
  return <Component>{maxLength ? truncate(value, maxLength) : value}</Component>;
};

export default TxHash;
