import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

const StyledContainer = styled(Layout)``;

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => <StyledContainer>{children}</StyledContainer>;

export default Container;
