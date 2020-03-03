import { Tabs as AntdTabs } from 'antd';
import React from 'react';
import styled from 'styled-components';

type TabsProps = React.ComponentProps<typeof AntdTabs>;

const Tabs: React.FC<TabsProps> = ({ ...other }) => {
  return <StyledAndtTabs animated={false} {...other} />;
};

const StyledAndtTabs = styled(AntdTabs)`
  .ant-tabs-bar {
    margin: 0;
  }
`;

export default Tabs;
