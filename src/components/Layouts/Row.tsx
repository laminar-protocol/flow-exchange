import React from 'react';
import { Row as AntdRow } from 'antd';

type AntdRowProps = React.ComponentProps<typeof AntdRow>;

const Row: React.FC<AntdRowProps> = ({ ...other }) => {
  return <AntdRow {...other} />;
};

export default Row;
