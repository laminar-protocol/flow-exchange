import React from 'react';
import { createUseStyles } from 'react-jss';

import { NavLink } from 'react-router-dom';

import { Row } from '../../../components';

export interface MenuItemProps {
  iconComponent?: React.ComponentType<any>;
  noRoute?: boolean;
  to?: string;
  onClick?: any;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ iconComponent: IconComponent, noRoute, to, onClick, children }) => {
  const classes = useStyles();

  const Element = noRoute ? 'a' : NavLink;

  if (noRoute) {
    return (
      <a onClick={onClick}>
        <Row align="middle" className={classes.root}>
          {IconComponent && <IconComponent className={classes.icon} />}
          <div className={classes.content}>{children}</div>
        </Row>
      </a>
    );
  }

  return (
    <NavLink to={to || ''} onClick={onClick} activeClassName={classes.activeNav}>
      <Row align="middle" className={classes.root}>
        {IconComponent && <IconComponent className={classes.icon} />}
        <div className={classes.content}>{children}</div>
      </Row>
    </NavLink>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    fontSize: '1rem',
    cursor: 'pointer',
    height: '3.5rem',
    color: theme.foregroundColor,
    marginLeft: '-1rem',
    marginRight: '-1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderLeft: '4px solid',
    borderLeftColor: 'transparent',
    // '&:hover': {
    //   extend: theme.linearGradientBorder,
    //   backgroundImage: 'linear-gradient(to left, #f4f7ff, #e6ebfe)',
    //   borderLeft: '4px solid',
    // },
  },
  activeNav: {
    '& $root': {
      extend: theme.linearGradientBorder,
      backgroundImage: 'linear-gradient(to left, #f4f7ff, #e6ebfe)',
      borderLeft: '4px solid',
    },
  },
  icon: {
    marginLeft: '0.25rem',
    width: '1.25rem',
    height: '1.25rem',
  },
  content: {
    marginLeft: '1rem',
    fontSize: '1rem',
  },
}));

export default MenuItem;
