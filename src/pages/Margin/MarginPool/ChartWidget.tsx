/* eslint-disable */
declare const TradingView: any;

import React, { useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { BaseProps } from '../../../types';

type ChartWidgetProps = {
  symbol: string;
  currentTheme?: string;
};

const ChartWidget: React.FC<ChartWidgetProps & BaseProps> = ({ className, symbol, currentTheme }) => {
  const classes = useStyles();

  const loadChart = useCallback((symbol: string, currentTheme = 'light') => {
    const tradingSymbol = [
      ['USDAAPL', 'AAPL'],
      ['FAAPLDAI', 'AAPL'],
      ['DAIFAAPL', 'AAPL'],
      ['USDXAU', 'XAUUSD'],
      ['DAIFXAU', 'XAUUSD'],
      ['DAI', 'USD'],
      ['AUSD', 'USD'],
      ['FEUR', 'EUR'],
      ['FJPY', 'JPY'],
      ['FXAU', 'XAU'],
      ['FBTC', 'BTC'],
      ['FETH', 'ETH'],
      ['FETH', 'ETH'],
    ].reduce((result, curr) => {
      return result.replace(curr[0], curr[1]);
    }, symbol);

    new TradingView.widget({
      autosize: true,
      symbol: tradingSymbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: currentTheme,
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: false,
      container_id: 'trading_view_widget',
    });
  }, []);

  useEffect(() => {
    loadChart(symbol, currentTheme);
  }, [symbol, currentTheme]);

  return <div id="trading_view_widget" className={clsx(classes.root, className)} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    'margin-left': '-1px',
    'margin-top': '-1px',
    'margin-right': '-1px',
    'margin-bottom': '-1px',
  },
}));

export default ChartWidget;
