import { Button } from 'antd';
import React from 'react';

type DefaultButtonProps = React.ComponentProps<typeof Button>;

const DefaultButton: React.FC<DefaultButtonProps> = ({ ...other }) => {
  return <Button {...other} />;
};

export default DefaultButton;
