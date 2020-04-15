import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      border: `1px solid ${theme.borderColor}`,
      fontWeight: theme.normalWeight,
      color: theme.foregroundColor,
      backgroundColor: theme.whiteForegroundColor,
    },
  },
}));

type LightButtonProps = React.ComponentProps<typeof Button>;

const LightButton: React.FC<LightButtonProps> = ({ className, ...other }) => {
  const classes = useStyles();

  return <Button className={clsx(className, classes.root)} {...other} />;
};

export default LightButton;
