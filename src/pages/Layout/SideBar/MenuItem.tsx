import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '../../../components';
import { theme } from '../../../styles';
import { IconProp } from '../../../types';

export interface MenuItemProps {
  icon: IconProp;
  noRoute?: boolean;
  to?: string;
  onClick?: any;
  children?: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, noRoute, to, onClick, children }) => {
  const Element = noRoute ? 'a' : Link;
  return (
    <Element to={to || ''} onClick={onClick}>
      <Item>
        <div className="menu-item__icon">
          <Icon icon={icon} />
        </div>
        <div className="menu-item__content">{children}</div>
      </Item>
    </Element>
  );
};

const Item = styled.div`
  font-size: 1rem;
  margin: 1.5rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: ${theme.foregroundColor};

  .menu-item__icon {
    width: 2rem;
  }

  .menu-item__content {
    flex: 1;
  }
`;

export default MenuItem;
