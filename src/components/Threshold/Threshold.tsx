import React from 'react';
import { BaseProps } from '../../types';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import { Tooltip } from '../Tooltip';
import { NumberFormat } from '../NumberFormat';
import { fixed18toNumber } from '@laminar/api/utils';

type ThresholdProps = {
  low: string;
  high: string;
  value: string;
} & BaseProps;

const Threshold: React.FC<ThresholdProps> = ({ component: Component = 'span', low, high, value: _value, ...other }) => {
  const classes = useStyles();

  let level = '';

  const value = fixed18toNumber(_value);
  const highValue = fixed18toNumber(high);
  const lowValue = fixed18toNumber(low);

  if (value > highValue * 1.5) {
    level = 'VS';
  } else if (value <= highValue * 1.5 && value > highValue) {
    level = 'S';
  } else if (value <= highValue && value > lowValue) {
    level = 'MC';
  } else {
    level = 'FC';
  }

  const getToolTipTitle = () => {
    if (level === 'VS') {
      return <span>{`Very Safe: > 120%`}</span>;
    }
    const dic: Record<string, string> = {
      S: 'Safe',
      MC: 'Margin Call',
      FC: 'Force Closure',
    };

    return (
      <span>
        {dic[level]}: <NumberFormat value={value} options={{ mantissa: 2 }} percent />
      </span>
    );
  };

  return (
    <Component
      className={clsx({
        [classes.verySafe]: level === 'VS',
        [classes.safe]: level === 'S',
        [classes.warning]: level === 'MC',
        [classes.danger]: level === 'FC',
      })}
      {...other}
    >
      <span className={classes.circel} />
      <Tooltip title={getToolTipTitle()}>
        <span className={classes.tag}>{level}</span>
      </Tooltip>
    </Component>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {},
  circel: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    display: 'inline-block',
    background: 'rgb(102, 102, 102)',
  },
  tag: {
    height: 16,
    'border-radius': 2,
    'background-color': 'rgb(102, 102, 102)',
    color: theme.alwaysWhiteForegroundColor,
    'font-size': 12,
    'margin-left': 4,
    padding: '2px 4px',
  },
  verySafe: {
    '& $circel, & $tag': {
      background: '#32af88',
    },
  },
  safe: {
    '& $circel, & $tag': {
      background: '#8fce65',
    },
  },
  warning: {
    '& $circel, & $tag': {
      background: '#f7b500',
    },
  },
  danger: {
    '& $circel, & $tag': {
      background: '#fa0000',
    },
  },
}));

export default Threshold;
