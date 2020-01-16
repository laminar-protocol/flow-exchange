import styled from 'styled-components';
import { Layout } from 'antd';

import * as theme from 'theme';

const Component = styled(Layout)`
  &.ant-layout {
    background-color: ${theme.backgroundColor};
  }
`;

export default Component;
