import { Descriptions as AntdDescriptions } from 'antd';
import React from 'react';

type DescriptionsProps = React.ComponentProps<typeof AntdDescriptions>;

const Descriptions: React.FC<DescriptionsProps> = ({ ...other }) => {
  return <AntdDescriptions {...other} />;
};

export default Descriptions;
