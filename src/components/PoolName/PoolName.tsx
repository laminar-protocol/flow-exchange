import React from 'react';

import { BaseProps } from '../../types';

const marginPoolNameMap: Record<string, string> = {
  '0': 'Laminar',
  '1': 'Crypto',
  '2': 'FX',
};

const syntheticPoolNameMap: Record<string, string> = {
  '0': 'Laminar',
  '1': 'Crypto',
  '2': 'FX',
};

type PoolNameProps = {
  value?: string;
  type: 'margin' | 'synthetic';
};

const PoolName: React.FC<BaseProps & PoolNameProps> = ({ component: Component = 'span', type, value, ...other }) => {
  if (!value) return null;

  let name = '';

  if (type === 'margin') {
    name = marginPoolNameMap[value];
  }

  if (type === 'synthetic') {
    name = syntheticPoolNameMap[value];
  }

  return <Component {...other}>{name || value.substring(0, 7)}</Component>;
};

export default PoolName;
