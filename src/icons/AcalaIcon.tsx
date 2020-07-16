import React from 'react';
import Icon from '@ant-design/icons';

type IconProps = React.ComponentProps<typeof Icon>;

const IconComponent = () => (
  <svg width="24px" height="21px" viewBox="0 0 24 21">
    <defs>
      <linearGradient x1="27.5324675%" y1="23.8128046%" x2="55.5380334%" y2="101.017926%" id="Acala-1">
        <stop stopColor="#FF9373" offset="39%"></stop>
        <stop stopColor="#FE8F73" offset="51%"></stop>
        <stop stopColor="#FB8373" offset="62%"></stop>
        <stop stopColor="#F77073" offset="73%"></stop>
        <stop stopColor="#F15472" offset="83%"></stop>
        <stop stopColor="#E93172" offset="94%"></stop>
        <stop stopColor="#E41A72" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="100.02885%" y1="49.9879295%" x2="8.647674%" y2="49.9879295%" id="Acala-2">
        <stop stopColor="#FF9373" offset="9%"></stop>
        <stop stopColor="#FD8A73" offset="15%"></stop>
        <stop stopColor="#F04E72" offset="55%"></stop>
        <stop stopColor="#E72872" offset="85%"></stop>
        <stop stopColor="#E41A72" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="89.1975677%" y1="49.9959778%" x2="28.4010969%" y2="49.9959778%" id="Acala-3">
        <stop stopColor="#FF9373" offset="0%"></stop>
        <stop stopColor="#E41A72" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-900.000000, -338.000000)" fillRule="nonzero">
        <g transform="translate(900.000000, 338.000000)">
          <g>
            <path
              d="M16.0292656,14.8792345 C14.9318003,14.5600276 13.7937646,14.4010528 12.6506033,14.4072614 C10.7747159,14.4028257 8.92638368,14.8574818 7.26767711,15.7313635 L8.34167828,13.9175692 L9.2945515,12.3067394 L11.8673092,7.93172576 L14.2898682,11.9588002 L10.300721,5.31573822 L6.00633137,12.6176295 L1.71194172,20.0274465 L4.8176624,20.0274465 C6.76005684,18.3095899 9.25851642,17.348157 11.8543889,17.3196416 C14.7000882,17.3083658 17.2728459,18.3392969 19.122066,20.0242248 L16.0292656,14.8792345 Z"
              fill="url(#Acala-1)"
            ></path>
            <path
              d="M10.3766279,0.0112758084 L5.18750642,8.78224387 L0,17.5580444 L0.85597086,18.7403935 L1.71194172,20.0290573 L6.00633137,12.6192404 L10.300721,5.31573822 L14.281793,11.9620218 C13.713736,11.8870266 13.1412444,11.850431 12.5682363,11.8524854 C11.4618595,11.8553485 10.3608483,12.0059569 9.2945515,12.3002961 L8.34167828,13.9111258 L7.26767711,15.7313635 C8.92445217,14.8585047 10.7704404,14.4038795 12.6441431,14.4072614 C13.7873044,14.4010528 14.9253401,14.5600276 16.0228055,14.8792345 L19.1091457,20.0242248 L22.3925207,20.0242248 L10.3766279,0.0112758084 Z"
              fill="url(#Acala-2)"
            ></path>
            <polygon
              fill="url(#Acala-3)"
              points="10.3766279 0.0112758084 22.3989809 20.0242248 23.921963 17.4630055 13.3951364 0"
            ></polygon>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const AcalaIcon = (props: IconProps) => <Icon component={IconComponent} {...props} />;

export default AcalaIcon;
