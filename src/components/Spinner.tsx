import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { theme } from '../styles';
import { BaseProps } from '../types';

interface SpinnerProps {
  loading?: boolean;
  size?: 'small' | 'default' | 'large';
}

const LoadingOutlinedSpin = <LoadingOutlined spin />;

const Spinner: React.FC<SpinnerProps & BaseProps> = ({ loading = true, size = 'default', ...other }) => (
  <SpinIcon indicator={LoadingOutlinedSpin} spinning={loading} size={size} {...other} />
);

const SpinIcon = styled(Spin)`
  &.ant-spin {
    color: ${theme.foregroundColor};
  }
`;

export default Spinner;
