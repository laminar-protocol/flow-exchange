import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { BaseProps } from '../../types';

type TextProps = {
  size?: 's' | 'l' | 't' | 'n';
  weight?: 'bold' | 'black';
  truncate?: number;
  light?: boolean;
  ellipsisi?: boolean;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  color?: 'greyColor1' | 'greyColor2' | 'greyColor3' | 'greyColor4';
};

const Text: React.FC<BaseProps & TextProps> = ({
  component: Component = 'span',
  ellipsisi,
  className,
  light,
  size,
  weight,
  color,
  align = 'inherit',
  ...other
}) => {
  const classes = useStyles({ size, weight, light, align, color });

  return (
    <Component
      {...other}
      className={clsx(classes.root, className, {
        [classes.ellipsisi]: ellipsisi,
      })}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    fontSize: (props: any) => {
      switch (props.size) {
        case 's':
          return theme.textSmallSize;
        case 'l':
          return theme.textLargeSize;
        case 't':
          return theme.textTitleSize;
        case 'n':
        default:
          return theme.textNormalSize;
      }
    },
    fontWeight: (props: any) => {
      switch (props.weight) {
        case 'bold':
          return theme.boldWeight;
        case 'black':
          return theme.blackWeight;
        default:
          return theme.normalWeight;
      }
    },
    color: (props: TextProps) =>
      props.light ? theme.lightForegroundColor : theme.textColor[props.color || 'greyColor1'],
    textAlign: (props: any) => props.align,
  },
  ellipsisi: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100%',
    display: 'inline-block',
    whitespace: 'nowrap',
  },
}));

export default Text;
