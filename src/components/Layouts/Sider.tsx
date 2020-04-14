import React from 'react';
import { Layout as AntdLayout } from 'antd';

const AntdSider = AntdLayout.Sider;

type AntdSiderProps = React.ComponentProps<typeof AntdSider>;

const Sider: React.FC<AntdSiderProps> = ({ ...other }) => {
  return <AntdSider {...other} />;
};

export default Sider;
