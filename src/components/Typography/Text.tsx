import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { BaseProps } from '../../types';

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
    color: (props: any) => (props.light ? theme.lightForegroundColor : theme.foregroundColor),
  },
  ellipsisi: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100%',
    display: 'inline-block',
    whitespace: 'nowrap',
  },
}));

type TextProps = {
  size?: 's' | 'l' | 't' | 'n';
  weight?: 'bold' | 'black';
  light?: boolean;
  ellipsisi?: boolean;
};

const Text: React.FC<BaseProps & TextProps> = ({ ellipsisi, className, light, ...other }) => {
  const classes = useStyles(other);

  return (
    <span
      {...other}
      className={clsx(classes.root, className, {
        [classes.ellipsisi]: ellipsisi,
      })}
    />
  );
};

export default Text;
