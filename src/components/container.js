import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

const Container = styled(Layout)`
`;

const Component = ({ children }) => (
  <Container>
    { children }
  </Container>
);

export default Component;
