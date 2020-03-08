import { Card as AntdCard } from 'antd';
import React from 'react';

type CardProps = React.ComponentProps<typeof AntdCard>;

const Card: React.FC<CardProps> = ({ ...other }) => {
  return <AntdCard {...other} />;
};

export default Card;
