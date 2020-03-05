import { Row as AntdRow } from 'antd';
import { RowProps as AntdRowProps } from 'antd/es/row';
import React from 'react';

const Row: React.FC<AntdRowProps> = ({ ...other }) => {
  return <AntdRow {...other} />;
};

export default Row;
