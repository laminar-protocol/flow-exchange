import { Layout as AntdLayout } from 'antd';
import React from 'react';

import Prime from './Prime';
import Routes from './Routes';
import SideBar from './SideBar';

const Layout: React.FC = () => {
  return (
    <AntdLayout>
      <SideBar />
      <Prime>
        <Routes />
      </Prime>
    </AntdLayout>
  );
};

export default Layout;
