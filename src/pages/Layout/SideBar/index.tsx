import React from 'react';
import { createUseStyles } from 'react-jss';

import { Layout, Sider } from '../../../components';
import Navigation from './Navigation';

const SideBar: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout className={classes.root}>
      <Sider width="100%" className="layout__sidebar">
        <Navigation />
      </Sider>
    </Layout>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-layout': {
      position: 'fixed',
      left: 0,
      height: '100vh',
      width: `${theme.sideBarWidth}px`,
      backgroundColor: `${theme.lightBackgroundColor}`,
      borderRight: `1px solid ${theme.borderColor}`,
      padding: '1rem',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      boxShadow: '0 20px 20px 0 rgba(13, 28, 90, 0.1)',
    },
    '& .layout__sidebar.ant-layout-sider': {
      backgroundColor: 'transparent',
    },
  },
}));

export default SideBar;
