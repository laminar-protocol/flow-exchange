import React from 'react';
import styled from 'styled-components';

import { theme } from '../styles';

interface ContainerProps {
  padding?: number;
  radius?: number;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid ${theme.borderColor};
  padding: ${props => props.padding || 1.25}rem;
  border-radius: ${props => props.radius || 0.5}rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  background-color: ${theme.lightBackgroundColor};
`;

interface Props extends ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const Panel: React.FC<Props> = ({ className, radius, padding, children }) => (
  <Container className={className} radius={radius} padding={padding}>
    {children}
  </Container>
);

export default Panel;
