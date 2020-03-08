import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { BaseProps } from '../../types';

interface SpinnerProps {
  loading?: boolean;
  size?: 'small' | 'default' | 'large';
  type?: 'full' | 'normal';
}

const LoadingOutlinedSpin = <LoadingOutlined spin />;

const Spinner: React.FC<SpinnerProps & BaseProps> = ({
  loading = true,
  size = 'default',
  type = 'normal',
  ...other
}) => {
  const classes = useStyles({ type });
  return (
    <Spin
      className={clsx(classes.root, {
        [classes.fullWidth]: type === 'full',
      })}
      indicator={LoadingOutlinedSpin}
      spinning={loading}
      size={size}
      {...other}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-spin': {
      color: theme.foregroundColor,
    },
  },
  fullWidth: {
    marginTop: '20px',
    marginBottom: '20px',
    width: '100%',
  },
}));

export default Spinner;
