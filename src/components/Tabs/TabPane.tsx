import { Tabs as AntdTab } from 'antd';
import React from 'react';

const AntdTabPane = AntdTab.TabPane;

type TabPaneProps = React.ComponentProps<typeof AntdTabPane>;

const TabPane: React.FC<TabPaneProps> = ({ ...other }) => {
  return <AntdTabPane {...other} />;
};

export default TabPane;
