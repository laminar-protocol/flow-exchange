import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const SwapExchange: React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, ...other }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <div className={classes.swapExchange}>
        <svg x="0px" y="0px" viewBox="0 0 512.025 512.025" className={classes.swapIcon}>
          <defs>
            <linearGradient id="color1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#004eff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#fa0000', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="color2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#004eff', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#fa0000', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          <g>
            <g>
              <g>
                <path
                  style={{ fill: 'url(#color2)' }}
                  d="M480.013,304.093c0,44.8-26.88,48-32,48H54.573l84.64-84.64l-22.56-22.72l-112,112c-6.204,6.241-6.204,16.319,0,22.56l112,112l22.56-22.56l-84.64-84.64h393.44c22.08,0,64-16,64-80v-48h-32V304.093z"
                />
                <path
                  style={{ fill: 'url(#color1)' }}
                  d="M32.013,208.093c0-44.8,26.88-48,32-48h393.44l-84.64,84.64l22.56,22.56l112-112c6.204-6.241,6.204-16.319,0-22.56l-112-112l-22.72,22.72l84.8,84.64H64.013c-22.08,0-64,16-64,80v48h32V208.093z"
                />
              </g>
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
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    margin: '0 1.5rem',
    'flex-direction': 'column',
    'justify-content': 'flex-end',
  },
  swapExchange: {
    cursor: 'pointer',
    width: '3.125rem',
    height: '3.125rem',
    'border-radius': '0.75rem',
    'box-shadow': '0 1px 20px 0 rgba(23, 65, 212, 0.18)',
    'border-style': 'solid',
    'border-width': '1px',
    'border-image-source': 'linear-gradient(to right, #004eff, #fa0000)',
    'border-image-slice': '1',
    'background-image': 'linear-gradient(to bottom, #ffffff, #ffffff), linear-gradient(to right, #004eff, #fa0000)',
    'background-origin': 'border-box',
    'background-clip': 'content-box, border-box',
  },
  swapIcon: {
    margin: '0.625rem',
  },
}));

export default SwapExchange;
