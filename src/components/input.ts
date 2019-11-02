import styled from 'styled-components';
import { Input as BaseInput } from 'antd';

import * as theme from 'theme';

const Input = styled(BaseInput)`
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

export default Input;
