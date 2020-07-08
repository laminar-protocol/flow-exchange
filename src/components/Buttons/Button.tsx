import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

type SolidButtonProps = React.ComponentProps<typeof Button>;

const SolidButton: React.FC<SolidButtonProps> = ({ className, ...other }) => {
  const classes = useStyles();

  return <Button className={clsx(className, classes.root)} {...other} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      border: 0,
      fontWeight: theme.boldWeight,
      color: theme.alwaysWhiteForegroundColor,
      background: theme.keyColorBlue,
    },
  },
}));

export default SolidButton;
