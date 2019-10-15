import React from 'react';
import styled from 'styled-components';

import * as theme from 'theme';

import LaminarLogo from 'assets/laminar.svg';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.lightBackgroundColor};
  padding: 1.5rem;
  display: none;
  border-bottom: 1px solid ${theme.borderColor};
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.05);
  ${theme.respondTo.sm`
    display: block;
  `};
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  height: 1rem;
  margin-right: 1rem;
`;

const LoogText = styled.div`
  font-size: 1rem;
  vertical-align: middle;
  font-weight: ${theme.boldWeight};
  color: ${theme.foregroundColor};
  text-transform: uppercase;
  background: linear-gradient(90deg, ${theme.keyColorBlue} 0%, ${theme.keyColorRed} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Component = ({ setting, onChangeTheme }) => (
  <Header>
    <LogoContainer>
      <Logo src={LaminarLogo} />
      <LoogText>Exchange</LoogText>
    </LogoContainer>
  </Header>
);

export default Component;
