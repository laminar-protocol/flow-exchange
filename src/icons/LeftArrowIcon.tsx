import React from 'react';
import Icon from '@ant-design/icons';

type IconProps = React.ComponentProps<typeof Icon>;

const IconComponent = () => (
  <svg width="40px" viewBox="0 0 512 512">
    <g>
      <g>
        <path d="M501.333,245.333H36.417l141.792-141.792c4.167-4.167,4.167-10.917,0-15.083c-4.167-4.167-10.917-4.167-15.083,0l-160,160c-4.167,4.167-4.167,10.917,0,15.083l160,160c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125c4.167-4.167,4.167-10.917,0-15.083L36.417,266.667h464.917c5.896,0,10.667-4.771,10.667-10.667S507.229,245.333,501.333,245.333z" />
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);

const LeftArrowIcon = (props: IconProps) => <Icon component={IconComponent} {...props} />;

export default LeftArrowIcon;
