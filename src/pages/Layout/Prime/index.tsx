import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../styles';
import Header from './Header';

interface Props {
  children?: React.ReactNode;
}

const Prime: React.FC<Props> = ({ children }) => (
  <Container>
    <Layout className="layout__prime">
      <Header />
      <div className="layout__content">{children}</div>
    </Layout>
  </Container>
);

const Container = styled(Layout)`
  margin-left: ${theme.sideBarWidth}px;

  ${theme.respondTo.sm`
    margin-left: 0;
  `}

  .layout__prime.ant-layout {
    background-color: ${theme.backgroundColor};
  }

  .layout__content {
    margin: 3rem;
    ${theme.respondTo.sm`
      margin: 1rem;
    `}
  }
`;

export default Prime;
