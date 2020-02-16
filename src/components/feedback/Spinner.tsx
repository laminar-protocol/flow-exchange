import { Icon, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { theme } from '../../styles';

const LoadingIcon = <Icon type="loading" spin />;
const SpinIcon = styled(Spin)`
  &.ant-spin {
    color: ${theme.foregroundColor};
  }
`;

interface Props {
  className?: string;
  loading?: boolean;
}

const Spinner: React.FC<Props> = ({ className, loading }) => (
  <SpinIcon indicator={LoadingIcon} className={className} spinning={loading} />
);

export default Spinner;
