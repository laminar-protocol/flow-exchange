import { Skeleton as AntdSkeleton } from 'antd';
import { SkeletonProps } from 'antd/es/skeleton';
import React from 'react';

const Skeleton: React.FC<SkeletonProps> = ({ ...other }) => {
  return <AntdSkeleton {...other} />;
};

export default Skeleton;
