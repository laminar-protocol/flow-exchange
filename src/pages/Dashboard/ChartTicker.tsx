import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const ChartTicker: React.FC = () => {
  const classes = useStyles();
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chartRef?.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = false;
      script.innerHTML = JSON.stringify({
        symbols: [
          {
            description: '',
            proName: 'FX:EURUSD',
          },
          {
            description: '',
            proName: 'FX:USDJPY',
          },
          {
            description: '',
            proName: 'BITSTAMP:BTCUSD',
          },
          {
            description: '',
            proName: 'BITSTAMP:ETHUSD',
          },
          {
            description: '',
            proName: 'OANDA:AUDUSD',
          },
          {
            description: '',
            proName: 'FX:USDCAD',
          },
          {
            description: '',
            proName: 'FX:USDCHF',
          },
          {
            description: '',
            proName: 'FX_IDC:XAUUSD',
          },
          {
            description: '',
            proName: 'TVC:USOIL',
          },
          {
            description: '',
            proName: 'FX:GBPUSD',
          },
        ],
        colorTheme: 'light',
        isTransparent: false,
        displayMode: 'compact',
        locale: 'en',
      });
      chartRef.current.appendChild(script);
    }
  }, [chartRef]);

  return (
    <Link to="/margin">
      <div ref={chartRef} className={classes.root}>
        <div className={classes.widget} />
      </div>
    </Link>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    flex: 1,
    'align-self': 'stretch',
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${theme.borderColor}`,
    'border-radius': '0.5rem',
    'box-shadow': '0 0 20px rgba(0, 0, 0, 0.05)',
    'background-color': `${theme.lightBackgroundColor}`,
    '& iframe': {
      'pointer-events': 'none',
    },
  },

  widget: {
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    right: '-1px',
    bottom: '-1px !important',
    border: '0px !important',
  },
}));

export default ChartTicker;
