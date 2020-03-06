import { Descriptions as AntdDescriptions } from 'antd';
import { DescriptionsItemProps as AntdDescriptionsItemProps } from 'antd/es/Descriptions/Item';
import React from 'react';

const AntdDescriptionsItem = AntdDescriptions.Item;

const DescriptionsItem: React.FC<AntdDescriptionsItemProps> = ({ ...other }) => {
  return <AntdDescriptionsItem {...other} />;
};

export default DescriptionsItem;
