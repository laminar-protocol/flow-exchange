import React from 'react';
import styled from 'styled-components';

import * as theme from 'theme';

const Container = styled.div`
  margin: ${(props) => (props.size || 2)}rem 0;
  height: ${(props) => (props.size || 1)}px;
  background-color: ${theme.separatorColor};
`;

const Component = ({ size, height, children }) => (
  <Container size={size} height={height}>
    { children }
  </Container>
);

export default Component;
