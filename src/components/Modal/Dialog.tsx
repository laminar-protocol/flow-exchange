import React from 'react';
import { Modal as AntdModal } from 'antd';

type AntdModalProps = React.ComponentProps<typeof AntdModal>;

const Dialog: React.FC<AntdModalProps> = ({ ...other }) => {
  return <AntdModal {...other} />;
};

export default Dialog;
