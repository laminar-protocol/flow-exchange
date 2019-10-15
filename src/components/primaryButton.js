import styled from 'styled-components';
import { Button } from 'antd';

import * as theme from 'theme';

const Component = styled(Button)`
  &.ant-btn,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active
  {
    background: linear-gradient(90deg, ${theme.keyColorBlue} 0%, ${theme.keyColorRed} 100%);
    color: #fff;
    border: 0;
    font-weight: ${theme.boldWeight};
  }
`;

export default Component;
