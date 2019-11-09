import styled from 'styled-components';
import { Switch } from 'antd';

import * as theme from 'theme';

const Component = styled(Switch)`
  &.ant-switch {
    background-color: ${theme.borderColor};
  }

  &.ant-switch-checked {
    background-color: ${theme.keyColorBlue};
  }
`;

export default Component;
