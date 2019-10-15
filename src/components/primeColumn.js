import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import * as theme from 'theme';

const Container = styled(Layout)`
  margin-left: ${theme.sideBarWidth}px;

  ${theme.respondTo.sm`
    margin-left: 0;
  `}
`;

const Component = ({ children }) => (
  <Container>
    { children }
  </Container>
);

export default Component;
