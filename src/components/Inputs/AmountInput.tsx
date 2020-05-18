import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Input as AntdInput } from 'antd';
import clsx from 'clsx';
import { useTokenInfo } from '../../hooks';

type AntdInputProps = {
  tokenId?: string;
  showSuffix?: boolean;
} & React.ComponentProps<typeof AntdInput>;

const Input: React.FC<AntdInputProps> = ({
  className,
  onChange,
  size = 'middle',
  tokenId,
  showSuffix = false,
  ...other
}) => {
  const classes = useStyles();

  const token = useTokenInfo(tokenId);
  const baseToken = useTokenInfo(({ isBaseToken }) => isBaseToken);

  const suffix = useMemo(() => {
    return showSuffix ? token?.name || baseToken?.name || null : null;
  }, [token, baseToken, showSuffix]);

  const re = useMemo(() => {
    return new RegExp(`^\\d{0,10}(\\.\\d{0,3})?$`);
  }, []);

  return (
    <AntdInput
      size={size}
      onChange={event => {
        if (event.target.value === '' || re.test(event.target.value)) {
          onChange && onChange(event);
        }
      }}
      suffix={suffix}
      className={clsx(classes.root, className, {
        [classes.large]: size === 'large',
        [classes.middle]: size === 'middle',
        [classes.hasSuffix]: showSuffix,
      })}
      {...other}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-input': {
      border: `1px solid ${theme.keyColorGrey}`,
      'border-radius': '2px !important',
      color: theme.foregroundColor,
      'background-color': theme.whiteForegroundColor,
    },

    '&.ant-input:hover': {
      border: `1px solid ${theme.darkBorderColor} !important`,
    },
    '&.ant-input:focus': {
      outline: 'none',
      border: `1px solid ${theme.darkBorderColor} !important`,
      'box-shadow': 'none !important',
    },
    '& .ant-input-group-addon .ant-select-open .ant-select-selector, .ant-input-group-addon .ant-select-focused .ant-select-selector': {
      color: 'inherit',
    },
    '& .ant-input-group-addon .ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector': {
      border: 'none',
    },
    '& .ant-input-group-addon .ant-select:not(.ant-select-disabled):hover .ant-select-selector': {
      border: 'none',
    },
    '& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector': {
      border: 'none',
    },
    '& .ant-input-group-addon .ant-select.ant-select-single:not(.ant-select-customize-input) .ant-select-selector': {
      border: 'none',
    },
    '& .ant-select': {
      outline: 0,
    },
    '& .ant-input-group-addon': {
      'background-color': theme.alwaysWhiteForegroundColor,
    },
  },
  large: {
    '&.ant-input-lg, & .ant-input-lg, & .ant-input-suffix': {
      'padding-top': '0.71875rem',
      'padding-bottom': '0.71875rem',
      'font-size': '1rem',
    },
    '& .ant-select-lg': {
      'font-size': '1.5rem',
    },
  },
  middle: {
    '&.ant-input, & .ant-input, & .ant-input-suffix': {
      'padding-top': '0.40625rem',
      'padding-bottom': '0.40625rem',
      'font-size': '1rem',
    },
  },
  hasSuffix: {
    '&.ant-input-affix-wrapper': {
      'padding-top': 0,
      'padding-bottom': 0,
      border: `1px solid ${theme.keyColorGrey}`,
    },
    '& .ant-input-suffix': {
      color: theme.textColor.greyColor4,
    },
  },
}));

export default Input;
