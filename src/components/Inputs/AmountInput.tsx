import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Input as AntdInput } from 'antd';
import clsx from 'clsx';

type AntdInputProps = React.ComponentProps<typeof AntdInput>;

const Input: React.FC<AntdInputProps> = ({ className, onChange, ...other }) => {
  const classes = useStyles();

  const re = useMemo(() => {
    return new RegExp(`^\\d{0,}(\\.\\d{0,8})?$`);
  }, []);

  return (
    <AntdInput
      size="large"
      onChange={event => {
        if (event.target.value === '' || re.test(event.target.value)) {
          onChange && onChange(event);
        }
      }}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
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
      padding: '11px 11px',
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
