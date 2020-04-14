import React from 'react';
import { Card as AntdCard } from 'antd';

type CardProps = React.ComponentProps<typeof AntdCard>;

const Card: React.FC<CardProps> = ({ ...other }) => {
  return <AntdCard {...other} />;
};

export default Card;
