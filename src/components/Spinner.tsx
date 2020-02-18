import { Icon, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { theme } from '../styles';
import { BaseProps } from '../types';

const LoadingIcon = <Icon type="loading" spin />;

const SpinIcon = styled(Spin)`
  &.ant-spin {
    color: ${theme.foregroundColor};
  }
`;

interface SpinnerProps {
  loading?: boolean;
  size?: 'small' | 'default' | 'large';
}

const Spinner: React.FC<SpinnerProps & BaseProps> = ({ loading = true, size = 'default', ...other }) => (
  <SpinIcon indicator={LoadingIcon} spinning={loading} size={size} {...other} />
);

export default Spinner;
