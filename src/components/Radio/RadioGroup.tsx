import React from 'react';
import { createUseStyles } from 'react-jss';
import { Radio as AntdRadio } from 'antd';
import clsx from 'clsx';

const AntdRadioGroup = AntdRadio.Group;
type RadioGroupProps = React.ComponentProps<typeof AntdRadioGroup> & {
  size?: 'small' | 'middle' | 'large' | undefined;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ size, className, ...other }) => {
  const classes = useStyles();

  return (
    <AntdRadioGroup
      className={clsx(classes.root, className, {
        [classes.large]: size === 'large',
        [classes.middle]: size === 'middle',
      })}
      buttonStyle="solid"
      {...other}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-radio-group': {
      display: 'flex',
      'flex-direction': 'row',
      'justify-content': 'flex-start',
      'align-items': 'center',
    },

    '& .ant-radio-button-input': {
      display: 'none',
    },

    '& .ant-radio-button-wrapper': {
      'align-self': 'stretch',
      flex: '1',
      'background-color': `${theme.keyColorGrey} !important`,
      display: 'block',
      border: '0 !important',
      padding: '2px !important',
      margin: '0 !important',
      'line-height': 'inherit',
      color: `${theme.foregroundColor} !important`,
      height: '100%',
    },

    '& .ant-radio-button-wrapper:not(:first-child)::before': {
      width: '0px',
    },

    '& .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)': {
      'box-shadow': 'none !important',
    },

    '& .ant-radio-button-wrapper,& .ant-radio-button-wrapper-checked': {
      '&>span.ant-radio-button': {
        display: 'block',
        padding: '0 2rem',
        'text-align': 'center',
        'white-space': 'nowrap',
      },
    },

    '& .ant-radio-button-wrapper-checked': {
      '&>span': {
        'background-color': theme.whiteForegroundColor,
        'border-radius': '0.25rem',
        'box-shadow': '0 0 5px rgba(0, 0, 0, 0.1)',
      },
    },

    '& .ant-radio-button+span': {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
    },
  },
  large: {
    '& .ant-radio-button-wrapper>span:last-child': {
      padding: '0.7rem',
    },
  },
  middle: {
    '& .ant-radio-button-wrapper>span:last-child': {
      padding: '0.5rem',
    },
  },
}));

export default RadioGroup;
