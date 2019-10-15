import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

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

const Component = ({
  icon, noRoute, to, onClick, children,
}) => {
  const Element = noRoute ? 'a' : Link;
  return (
    <Element to={to} onClick={onClick}>
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

export default Component;
