import { Descriptions as AntdDescriptions } from 'antd';
import React from 'react';

const AntdDescriptionsItem = AntdDescriptions.Item;
type DescriptionsItemProps = React.ComponentProps<typeof AntdDescriptionsItem>;

const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ ...other }) => {
  return <AntdDescriptionsItem {...other} />;
};

export default DescriptionsItem;
