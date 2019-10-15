import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import * as theme from 'theme';

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
`;

const Component = ({ children }) => (
  <Container>
    { children }
  </Container>
);

export default Component;
