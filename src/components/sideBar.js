import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

const {
  Sider,
} = Layout;

const SideBar = styled(Sider)`
  &.ant-layout-sider {
    background-color: transparent;
  }
`;

const Component = ({ children }) => (
  <SideBar width="100%">
    { children }
  </SideBar>
);

export default Component;
