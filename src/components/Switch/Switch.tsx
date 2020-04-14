import React from 'react';
import { createUseStyles } from 'react-jss';
import { Switch as AntdSwitch } from 'antd';
import clsx from 'clsx';

type SwitchProps = React.ComponentProps<typeof AntdSwitch>;

const Switch: React.FC<SwitchProps> = ({ className, ...other }) => {
  const classes = useStyles();

  return <AntdSwitch className={clsx(classes.root, className)} {...other} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-switch': {
      'background-color': theme.borderColor,
    },

    '&.ant-switch-checked': {
      'background-color': theme.keyColorBlue,
    },
  },
}));

export default Switch;
