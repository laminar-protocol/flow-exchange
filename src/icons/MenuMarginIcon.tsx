import React from 'react';
import Icon from '@ant-design/icons';

type IconProps = React.ComponentProps<typeof Icon>;

const IconComponent = () => (
  <svg viewBox="0 0 20 17">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-20.000000, -242.000000)">
        <g transform="translate(20.000000, 241.000000)">
          <rect x="0" y="0" width="20" height="20"></rect>
          <path
            d="M19.3345642,16.6923139 C19.7020743,16.6923139 20,16.9825318 20,17.3461569 C20,17.7072645 19.7017565,18 19.3345642,18 L0.665435792,18 C0.297925758,18 0,17.7097821 0,17.3461569 C0,16.9850494 0.298243466,16.6923139 0.665435792,16.6923139 L3.33333333,16.6923139 L3.33333333,12.7676502 C3.33333333,12.4074293 3.62924322,12.1154125 4,12.1154125 C4.36818984,12.1154125 4.66666667,12.4072302 4.66666667,12.7676502 L4.66666667,16.6923139 L7.33333332,16.6923139 L7.33333332,10.1529042 C7.33333332,9.79233742 7.6292432,9.50004036 8,9.50004036 C8.3681898,9.50004036 8.66666666,9.7926282 8.66666666,10.1529042 L8.66666666,16.6923139 L11.3333333,16.6923139 L11.3333333,11.4586779 C11.3333333,11.0991673 11.6292432,10.8077265 12,10.8077265 C12.3681898,10.8077265 12.6666667,11.09858 12.6666667,11.4586779 L12.6666667,16.6923139 L15.3333336,16.6923139 C15.3333334,16.692124 15.3333333,8.19292421 15.3333333,8.19292421 C15.3333333,7.83150188 15.6292432,7.5385112 16,7.5385112 C16.3681898,7.5385112 16.6666667,7.82923002 16.6666667,8.19292421 L16.6666667,16.691744 C16.6666667,16.691934 19.3345642,16.6923139 19.3345642,16.6923139 Z M12.2971715,8.96469975 C12.0615153,9.19905313 11.6849717,9.22506464 11.4181477,9.02542243 L7.89546707,6.37744467 L1.81529518,11.9687012 C1.54707345,12.2160811 1.12516255,12.203368 0.872930789,11.9403057 C0.62069903,11.6772433 0.633661465,11.263448 0.901883194,11.0160681 L7.37658814,5.04446995 C7.61413247,4.82538367 7.97840366,4.80697111 8.23765366,5.00094632 L11.7542731,7.66429911 L16.9296163,2.49555142 L14.7418936,2.73922275 C14.3760554,2.77997028 14.0458046,2.52213684 14.0042579,2.16333565 C13.9627112,1.80453445 14.2256015,1.48063622 14.5914397,1.43988869 L18.5026175,1.00425673 C18.898063,0.960211504 19.2445113,1.26359185 19.2445113,1.65392373 L19.2445113,5.10812761 C19.2445113,5.46923516 18.9460345,5.76197068 18.5778447,5.76197069 C18.2096548,5.76197069 17.911178,5.46923521 17.9111779,5.10812766 L17.9111779,3.38173173 L12.2971715,8.96469975 Z"
            fill="#3B3B43"
            fillRule="nonzero"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

const MenuMarginIcon = (props: IconProps) => <Icon component={IconComponent} {...props} />;

export default MenuMarginIcon;
