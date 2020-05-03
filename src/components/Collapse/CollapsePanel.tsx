import React from 'react';
import { Collapse as AntdCollapse } from 'antd';

const AntdCollapsePanel = AntdCollapse.Panel;

type CollapsePanelProps = React.ComponentProps<typeof AntdCollapsePanel>;

const CollapsePanel: React.FC<CollapsePanelProps> = ({ ...other }) => {
  return <AntdCollapsePanel {...other} />;
};

export default CollapsePanel;
