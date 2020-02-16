import React from 'react';
import styled from 'styled-components';

import { theme } from '../../styles';

interface ContainerProps {
  size?: number;
  height?: number;
}

const Container = styled.div<ContainerProps>`
  margin: ${props => props.size || 2}rem 0;
  height: ${props => props.height || 1}px;
  background-color: ${theme.separatorColor};
`;

interface Props extends ContainerProps {
  children?: React.ReactNode;
}

const Separator: React.FC<Props> = ({ size, height, children }) => (
  <Container size={size} height={height}>
    {children}
  </Container>
);

export default Separator;
