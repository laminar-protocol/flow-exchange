import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { Text } from '../Typography';
import { BaseProps } from '../../types';

type DescriptionProps = {
  label: React.ReactNode;
  align?: ['center', 'flex-start', 'flex-end'][number];
};

const Description: React.FC<BaseProps & DescriptionProps> = ({
  component: Component = 'div',
  align = 'flex-start',
  label,
  className,
  children,
  ...other
}) => {
  const classes = useStyles({ align });

  return (
    <Component className={clsx(classes.root, className)} {...other}>
      <Text size="s" color="greyColor3" className={classes.label}>
        {label}
      </Text>
      <Text>{children}</Text>
    </Component>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: (props: DescriptionProps) => props.align,
    'justify-content': 'center',
  },
  label: {
    marginBottom: '0.5rem',
  },
}));

export default Description;
