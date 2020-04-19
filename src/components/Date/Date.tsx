import React from 'react';
import dayjs from 'dayjs';

import { BaseProps } from '../../types';

type DateProps = {
  value: number;
  format?: string;
};

const Date: React.FC<BaseProps & DateProps> = ({
  component: Component = 'span',
  value,
  format = 'MM/DD/YYYY HH:mm:ss',
  ...other
}) => {
  if (!value) return null;
  return <Component {...other}>{dayjs(value).format(format)}</Component>;
};

export default Date;
