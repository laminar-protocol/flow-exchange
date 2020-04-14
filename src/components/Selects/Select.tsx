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
    },
    '&.ant-select:not(.ant-select-disabled):hover .ant-select-selector': {
      'border-color': theme.keyColorGrey,
    },
    '&.ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector': {
      'border-color': theme.keyColorGrey,
    },
  },
  dropdown: {
    '& .ant-select-item-option-selected:not(.ant-select-item-option-disabled)': {
      background: theme.keyColorGrey,
    },
  },
}));

export default Select;
