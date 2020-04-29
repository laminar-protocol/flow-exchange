import { Tooltip as AntdTooltip } from 'antd';
import React from 'react';

type TooltipProps = React.ComponentProps<typeof AntdTooltip>;

const Tooltip: React.FC<TooltipProps> = ({ ...other }) => {
  return <AntdTooltip {...other} />;
};

export default Tooltip;
