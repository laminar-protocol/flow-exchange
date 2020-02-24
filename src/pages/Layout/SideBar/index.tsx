import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../styles';
import Navigation from './Navigation';

const { Sider } = Layout;

const SideBar: React.FC = () => (
  <Container>
    <Sider width="100%" className="layout__sidebar">
      <Navigation />
    </Sider>
  </Container>
);

const Container = styled(Layout)`
  &.ant-layout {
    position: fixed;
    left: 0;

    height: 100vh;
    width: ${theme.sideBarWidth}px;

    background-color: ${theme.lightBackgroundColor};
    border-right: 1px solid ${theme.borderColor};

    padding: 1.5rem;
    ${theme.respondTo.sm`
      display: none;
    `}

    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.05);
  }

  .layout__sidebar.ant-layout-sider {
    background-color: transparent;
  }
`;

export default SideBar;
