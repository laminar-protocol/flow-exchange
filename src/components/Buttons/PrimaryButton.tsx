import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      background: `linear-gradient(90deg, ${theme.keyColorBlue} 0%, ${theme.keyColorRed} 100%)`,
      color: '#fff',
      border: 0,
      fontWeight: theme.boldWeight,
    },
    '&.ant-btn[disabled], &.ant-btn[disabled]:hover': {
      opacity: 0.75,
      color: '#fff',
    },
  },
}));

type PrimaryButtonProps = React.ComponentProps<typeof Button>;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ className, ...other }) => {
  const classes = useStyles();

  return <Button className={clsx(className, classes.root)} {...other} />;
};

export default PrimaryButton;
