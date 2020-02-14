import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled(Layout)``;

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ ...other }) => <StyledContainer {...other} />;

export default Container;
