import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import { Collapse as AntdCollapse } from 'antd';

type CollapseProps = React.ComponentProps<typeof AntdCollapse>;

const Collapse: React.FC<CollapseProps> = ({ className, ...other }) => {
  const classes = useStyles();

  return <AntdCollapse bordered={false} className={clsx(className, classes.root)} {...other} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-collapse-borderless': {
      'background-color': 'transparent',
    },
  },
}));

export default Collapse;
