import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-btn': {
      color: '#0155ff',
      'border-style': 'solid',
      'border-width': '0.08rem',
      'border-color': theme.keyColorGrey,
      'border-image-slice': 1,
      'border-image-source': 'linear-gradient(to right, #004eff, #fa0000)',
      transition: 'none',
    },
    '&.ant-btn:hover': {
      background: `linear-gradient(90deg, ${theme.keyColorBlue} 0%, ${theme.keyColorRed} 100%)`,
      color: '#fff',
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
