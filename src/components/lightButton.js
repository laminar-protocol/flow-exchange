import styled from 'styled-components';
import { Button } from 'antd';

import * as theme from 'theme';

const Component = styled(Button)`
  &.ant-btn,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active
  {
    border: 1px solid ${theme.borderColor};
    font-weight: ${theme.normalWeight};
    color: ${theme.foregroundColor};
    background-color: ${theme.whiteForegroundColor};
  }
`;

export default Component;
