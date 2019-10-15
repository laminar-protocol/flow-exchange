import React from 'react';
import styled from 'styled-components';

import Text from './text';
import Panel from './panel';

import * as theme from 'theme';

const Container = styled(Panel)`
`;

const Component = ({ radius, padding, children }) => (
  <Container radius={radius} padding={padding}>
    { children }
  </Container>
);

export default Component;
