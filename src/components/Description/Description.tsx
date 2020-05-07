import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { Text } from '../Typography';
import { BaseProps } from '../../types';

type DescriptionProps = {
  label: React.ReactNode;
  space?: string | number;
  width?: string | number;
  height?: string | number;
  layout?: 'horizontal' | 'vertical';
  align?: ['center', 'flex-start', 'flex-end'][number];
  justify?: ['start', 'end', 'center', 'space-around', 'space-between'][number];
  labelProps?: any;
  contentProps?: any;
};

const Description: React.FC<BaseProps & DescriptionProps> = ({
  component: Component = 'div',
  align,
  justify,
  layout = 'horizontal',
  labelProps,
  contentProps,
  space,
  label,
  className,
  width,
  height,
  children,
  ...other
}) => {
  const classes = useStyles({ align, justify, width, height });

  return (
    <Component
      className={clsx(
        {
          [classes.horizontal]: layout === 'horizontal',
          [classes.vertical]: layout === 'vertical',
        },
        className,
      )}
      {...other}
    >
      <Text size="s" color="greyColor3" className={classes.label}>
        {label}
      </Text>
      <Text className={classes.content}>{children}</Text>
    </Component>
  );
};

const useStyles = createUseStyles(theme => ({
  vertical: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': (props: DescriptionProps) => props.align || 'flex-start',
    'justify-content': (props: DescriptionProps) => props.justify || 'center',
    '& $label': {
      marginBottom: (props: DescriptionProps) => props.space || '0.5rem',
    },
    width: (props: DescriptionProps) => props.width || 'auto',
    height: (props: DescriptionProps) => props.height || 'auto',
  },
  horizontal: {
    display: 'flex',
    'flex-direction': 'row',
    'align-items': (props: DescriptionProps) => props.align || 'center',
    'justify-content': (props: DescriptionProps) => props.justify || 'flex-start',
    '& $label': {
      marginRight: (props: DescriptionProps) => props.space || '0.5rem',
    },
    '& $content': {
      'font-size': '0.75rem',
    },
    width: (props: DescriptionProps) => props.width || 'auto',
    height: (props: DescriptionProps) => props.height || 'auto',
  },
  label: {
    'white-space': 'nowrap',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
  },
  content: {},
}));

export default Description;
