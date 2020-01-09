import styled from 'styled-components';
import { Button } from 'antd';

import * as theme from 'theme';

const SolidButton = styled(Button)`
  &.ant-btn,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active {
    border: 0px;
    font-weight: ${theme.boldWeight};
    color: ${theme.alwaysWhiteForegroundColor};
    background-color: ${theme.keyColorBlue};
  }
`;

export default SolidButton;
