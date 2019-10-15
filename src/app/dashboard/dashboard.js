import React from 'react';
import styled from 'styled-components';

import { Text, TextCell, Separator } from 'components';

const Container = styled.div`
`;

const Component = () => (
  <Container>
    <Text size="h">Dashboard</Text>
    <Separator />
    <TextCell>
      Hello
    </TextCell>
  </Container>
);

export default Component;
