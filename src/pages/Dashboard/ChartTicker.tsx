import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '../../styles';

class ChartTicker extends Component {
  public chartRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
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
          proName: 'OANDA:XAUUSD',
        },
        {
          description: '',
          proName: 'NASDAQ:AAPL',
        },
      ],
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'compact',
      locale: 'en',
    });
    this.chartRef.current.appendChild(script);
  }

  render() {
    return (
      <Link to="/margin">
        <Widget ref={this.chartRef}>
          <div className="tradingview-widget-container__widget" />
        </Widget>
      </Link>
    );
  }
}

const Widget = styled.div`
  flex: 1;
  align-self: stretch;
  position: relative;
  overflow: hidden;

  border: 1px solid ${theme.borderColor};
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  background-color: ${theme.lightBackgroundColor};

  #tradingview-widget-container__widget {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px !important;
    border: 0px !important;
  }

  iframe {
    pointer-events: none;
  }
`;

export default ChartTicker;
