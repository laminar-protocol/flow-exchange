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

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const PrimeColumn: React.FC<Props> = ({ children }) => <Container>{children}</Container>;

export default PrimeColumn;
