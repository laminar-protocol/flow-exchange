import React from 'react';
import Icon from '@ant-design/icons';

type IconProps = React.ComponentProps<typeof Icon>;

const IconComponent = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-128.000000, -481.000000)">
        <g transform="translate(128.000000, 481.000000)">
          <circle fill="#3B3B43" cx="12" cy="12" r="12"></circle>
          <g transform="translate(6.000000, 7.000000)" fill="#FFFFFF" fillRule="nonzero">
            <path d="M6.67975022,4.92989281 L12.3157895,0.4375 L0,0.4375 L5.63603925,4.92989281 C5.92827832,5.16225795 6.38751115,5.16225795 6.67975022,4.92989281 Z"></path>
            <path d="M12.91875,1.10416667 L6.90625,5.92322914 C6.58125,6.19527299 6.0125,6.19527299 5.6875,5.92322914 L0,1.37621052 L0,8.52707741 C0,9.80956984 1.096875,9.77070643 2.4375,9.77070643 L10.5625,9.77070643 C11.903125,9.77070643 13,9.80956984 13,8.52707741 L13,1.45393733 C13,1.33734711 12.959375,1.22075689 12.91875,1.10416667 Z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const EmailIcon = (props: IconProps) => <Icon component={IconComponent} {...props} />;

export default EmailIcon;
