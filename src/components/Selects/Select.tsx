import React from 'react';
import { createUseStyles } from 'react-jss';
import { Select as AntdSelect } from 'antd';
import clsx from 'clsx';

const AntdSelectOption = AntdSelect.Option;

type SelectProps = React.ComponentProps<typeof AntdSelect>;
type SelectOptionProps = React.ComponentProps<typeof AntdSelectOption>;

const Select: React.FC<SelectProps> & {
  Option: React.FC<SelectOptionProps>;
} = ({ className, dropdownClassName, ...other }) => {
  const classes = useStyles();

  return (
    <AntdSelect
      dropdownClassName={clsx(classes.dropdown, dropdownClassName)}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
};

Select.Option = AntdSelect.Option;

const useStyles = createUseStyles(theme => ({
  root: {
    '&.ant-select-single:not(.ant-select-customize-input) .ant-select-selector': {
      'border-color': theme.keyColorGrey,
      height: '2.5rem',
    },
    '&.ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-item, .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-placeholder': {
      'line-height': '2.5rem',
    },
    '&.ant-select:not(.ant-select-disabled):hover .ant-select-selector': {
      'border-color': theme.keyColorGrey,
    },
    '&.ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector': {
      'border-color': theme.keyColorGrey,
    },
    '&.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector': {
      height: '3.125rem',
    },
    '&.ant-select-single.ant-select-lg:not(.ant-select-customize-input):not(.ant-select-customize-input) .ant-select-selection-search-input': {
      height: '3.125rem',
    },
    '&.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-item, .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-placeholder': {
      'line-height': '3.125rem',
    },
    '& .ant-select-selection-item': {
      'text-align': 'left',
    },
  },
  dropdown: {
    '& .ant-select-item-option-selected:not(.ant-select-item-option-disabled)': {
      background: theme.keyColorGrey,
    },
  },
}));

export default Select;
