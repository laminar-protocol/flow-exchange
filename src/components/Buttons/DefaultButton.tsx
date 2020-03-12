import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      border: `1px solid ${theme.borderColor}`,
      fontWeight: theme.boldWeight,
      color: theme.foregroundColor,
      backgroundColor: theme.lightBackgroundColor,
    },
  },
}));

type DefaultButtonProps = React.ComponentProps<typeof Button>;

const DefaultButton: React.FC<DefaultButtonProps> = ({ className, ...other }) => {
  const classes = useStyles();

  return <Button className={clsx(className, classes.root)} {...other} />;
};

export default DefaultButton;
