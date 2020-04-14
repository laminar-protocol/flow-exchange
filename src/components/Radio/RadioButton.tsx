import React from 'react';
import { Radio as AntdRadio } from 'antd';

const AntdRadioButton = AntdRadio.Button;

type RadioButtonProps = React.ComponentProps<typeof AntdRadioButton>;

const RadioButton: React.FC<RadioButtonProps> = ({ ...other }) => {
  return <AntdRadioButton {...other} />;
};

export default RadioButton;
