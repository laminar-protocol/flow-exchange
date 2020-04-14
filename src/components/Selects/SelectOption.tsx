import React from 'react';
import { Select as AntdSelect } from 'antd';

const AntdSelectOption = AntdSelect.Option;

type SelectOptionProps = React.ComponentProps<typeof AntdSelectOption>;

const SelectOption: React.FC<SelectOptionProps> = ({ ...other }) => {
  return <AntdSelectOption {...other} />;
};

export default SelectOption;
