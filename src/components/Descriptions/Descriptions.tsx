import { Descriptions as AntdDescriptions } from 'antd';
import { DescriptionsProps as AntdDescriptionsProps } from 'antd/es/Descriptions';
import React from 'react';

const Descriptions: React.FC<AntdDescriptionsProps> = ({ ...other }) => {
  return <AntdDescriptions {...other} />;
};

export default Descriptions;
