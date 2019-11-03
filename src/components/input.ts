import styled from 'styled-components';
import { Input } from 'antd';

import * as theme from 'theme';

const Component = styled(Input)`
  &.ant-input {
    background-color: ${theme.whiteForegroundColor};
    border: 1px solid ${theme.borderColor};
    border-radius: 0.5rem !important;
    color: ${theme.foregroundColor};
  }
  &:hover {
    border: 1px solid ${theme.darkBorderColor} !important;
  }
  &:focus {
    outline: none;
    border: 1px solid ${theme.darkBorderColor} !important;
    box-shadow: none !important;
  }
`;

export default Component;
