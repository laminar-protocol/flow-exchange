import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Tooltip } from '../Tooltip';

type DefaultButtonProps = React.ComponentProps<typeof Button> & {
  tooltip?: string;
};

const DefaultButton: React.FC<DefaultButtonProps> = ({ className, tooltip, disabled = false, ...other }) => {
  const classes = useStyles();

  const inner = (
    <Button
      disabled={disabled}
      className={clsx(className, {
        [classes.disabled]: disabled,
      })}
      {...other}
    />
  );

  return tooltip ? <Tooltip title={tooltip}>{inner}</Tooltip> : inner;
};

const useStyles = createUseStyles({
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
});

export default DefaultButton;
