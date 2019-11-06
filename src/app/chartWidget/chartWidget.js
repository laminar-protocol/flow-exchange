/* eslint-disable */

import React, { useEffect } from 'react';
import styled from 'styled-components';

import * as theme from 'theme';

const Widget = styled.div`
  flex: 1;
  align-self: stretch;
  position: relative;
  overflow: hidden;

  border: 1px solid ${theme.borderColor};
  border-radius: ${(props) => (props.radius || 0.5)}rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  background-color: ${theme.lightBackgroundColor};

  #trading_view_widget {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px !important;
  }
`;

const loadChart = (symbol) => {
  new TradingView.widget({
    "autosize": true,
    "symbol": symbol,
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "Light",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "allow_symbol_change": false,
    "container_id": "trading_view_widget"
  });
};

const ChartWidget = ({
  symbol,
}) => {
  useEffect(() => {
    loadChart(symbol);
  }, [symbol]);

  return (
    <Widget>
      <div id="trading_view_widget" />
    </Widget>
  );
};
export default ChartWidget;
