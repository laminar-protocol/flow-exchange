import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

const {
  Sider,
} = Layout;

const StyledSideBar = styled(Sider)`
  &.ant-layout-sider {
    background-color: transparent;
  }
`;

interface Props {
  children?: ReactNode;
  className?: string;
}

const SideBar: React.FC<Props> = ({ children, className }) => (
  <StyledSideBar width="100%" className={className}>
    { children }
  </StyledSideBar>
);

export default SideBar;
