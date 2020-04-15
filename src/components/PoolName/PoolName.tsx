import React from 'react';

import { BaseProps } from '../../types';

const poolNameMap: Record<string, string> = {
  '0': 'Laminar',
};

type PoolNameProps = {
  value: string;
};

const PoolName: React.FC<BaseProps & PoolNameProps> = ({ component: Component = 'span', value, ...other }) => {
  return <Component {...other}>{poolNameMap[value as any] || value.substring(0, 7)}</Component>;
};

export default PoolName;
