import React from 'react';
import styled from 'styled-components';

import * as theme from 'theme';

const Container = styled.div`
  border: 1px solid ${theme.borderColor};
  padding: ${(props) => (props.padding || 1.25)}rem;
  border-radius: ${(props) => (props.padding || 0.5)}rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  background-color: ${theme.lightBackgroundColor};
`;

const Component = ({
  className, radius, padding, children,
}) => (
  <Container className={className} radius={radius} padding={padding}>
    { children }
  </Container>
);

export default Component;
