import React from 'react';
import { createUseStyles } from 'react-jss';
import { Input as AntdInput } from 'antd';
import clsx from 'clsx';

type AntdInputProps = React.ComponentProps<typeof AntdInput>;

const Input: React.FC<AntdInputProps> = ({ className, onChange, ...other }) => {
  const classes = useStyles();

  return <AntdInput size="large" className={clsx(classes.root, className)} {...other} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-input': {
      border: `1px solid ${theme.keyColorGrey}`,
      'border-radius': '2px !important',
      color: theme.foregroundColor,
      'background-color': theme.whiteForegroundColor,
    },
    '&.ant-input-lg': {
      padding: '0.6875rem 0.6875rem',
    },
    '&.ant-input:hover': {
      border: `1px solid ${theme.darkBorderColor} !important`,
    },
    '&.ant-input:focus': {
      outline: 'none',
      border: `1px solid ${theme.darkBorderColor} !important`,
      'box-shadow': 'none !important',
    },
  },
}));

export default Input;
