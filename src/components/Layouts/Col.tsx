import React from 'react';
import { Col as AntdCol } from 'antd';

type AntdColProps = React.ComponentProps<typeof AntdCol>;

const Col: React.FC<AntdColProps> = ({ ...other }) => {
  return <AntdCol {...other} />;
};

export default Col;
