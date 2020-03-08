import { Table as AntdTable } from 'antd';
import React from 'react';

type TableProps = React.ComponentProps<typeof AntdTable>;

const Comp: React.FC<TableProps> = ({ ...other }) => {
  return <AntdTable pagination={false} {...other} />;
};

export default Comp;
