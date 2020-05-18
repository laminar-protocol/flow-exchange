import { Space as AntdSpace } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

type AntdSpaceProps = React.ComponentProps<typeof AntdSpace>;

const Space: React.FC<AntdSpaceProps> = ({ direction, className, ...other }) => {
  const classes = useStyles();

  return (
    <AntdSpace
      direction={direction}
      className={clsx(
        {
          [classes.vertical]: direction === 'vertical',
        },
        className,
      )}
      {...other}
    />
  );
};

const useStyles = createUseStyles({
  vertical: {
    '&.ant-space': {
      display: 'flex',
    },
  },
});

export default Space;
