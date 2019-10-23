
import React from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';

import * as theme from 'theme';

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

const Spinner = ({ className, loading }: Props) => (
  <SpinIcon indicator={LoadingIcon} className={className} spinning={loading} />
);

export default Spinner;
