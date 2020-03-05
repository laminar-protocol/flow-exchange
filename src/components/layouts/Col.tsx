import { Col as AntdCol } from 'antd';
import { ColProps as AntdColProps } from 'antd/es/col';
import React from 'react';

const Col: React.FC<AntdColProps> = ({ ...other }) => {
  return <AntdCol {...other} />;
};

export default Col;
