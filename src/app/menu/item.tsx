import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import * as theme from 'theme';

const Item = styled.div`
  font-size: 1rem;
  margin: 1.5rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: ${theme.foregroundColor};
`;

const Icon = styled.div`
  width: 2rem;
`;

const Content = styled.div`
  flex: 1;
`;

// ----------
// Interface
// ----------
export interface StateProps {
  icon: IconProp;

  noRoute?: boolean;
  to?: string;
  onClick?: any;
  children?: ReactNode;
}

const MenuItem: React.FC<StateProps> = ({
  icon, noRoute, to, onClick, children,
}) => {
  const Element = noRoute ? 'a' : Link;
  return (
    <Element to={to || ''} onClick={onClick}>
      <Item>
        <Icon>
          <FontAwesomeIcon icon={icon} />
        </Icon>
        <Content>
          { children }
        </Content>
      </Item>
    </Element>
  );
};

export default MenuItem;
