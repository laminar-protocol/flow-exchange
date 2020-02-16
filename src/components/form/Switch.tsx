import { Switch } from 'antd';
import styled from 'styled-components';

import { theme } from '../../styles';

const Component = styled(Switch)`
  &.ant-switch {
    background-color: ${theme.borderColor};
  }

  &.ant-switch-checked {
    background-color: ${theme.keyColorBlue};
  }
`;

export default Component;
