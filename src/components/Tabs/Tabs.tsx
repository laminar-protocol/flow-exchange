import { Tabs as AntdTabs } from 'antd';
import clsx from 'clsx';

import React from 'react';
import { createUseStyles } from 'react-jss';

type TabsProps = React.ComponentProps<typeof AntdTabs>;

const Tabs: React.FC<TabsProps> = ({ className, ...other }) => {
  const classes = useStyles();
  return <AntdTabs className={clsx(className, classes.root)} animated={false} {...other} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-tabs-bar, & .ant-tabs-bar': {
      margin: 0,
    },
  },
}));

export default Tabs;
