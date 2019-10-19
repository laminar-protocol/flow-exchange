
import React from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';

import * as theme from 'theme';

const LoadingIcon = <Icon type="loading" spin />;
const SpinIcon = styled(Spin)`
  &.ant-spin {
    color: ${theme.fadeForegroundColor};
  }
`;


const Component = ({ className }) => (
  <SpinIcon indicator={LoadingIcon} className={className} />
);

export default Component;
