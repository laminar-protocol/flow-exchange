import React from 'react';
import { Layout as AntdLayout } from 'antd';

type AntdLayoutProps = React.ComponentProps<typeof AntdLayout>;

const Layout: React.FC<AntdLayoutProps> = ({ ...other }) => {
  return <AntdLayout {...other} />;
};

export default Layout;
