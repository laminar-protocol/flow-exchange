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

const MAP: Record<string, string> = {
  EURUSD: 'FX:EURUSD',
  USDJPY: 'FX:USDJPY',
  BTCUSD: 'BITSTAMP:BTCUSD',
  ETHUSD: 'BITSTAMP:ETHUSD',
  AUDUSD: 'OANDA:AUDUSD',
  USDCAD: 'FX:USDCAD',
  USDCHF: 'FX:USDCHF',
  XAUUSD: 'FX_IDC:XAUUSD',
  OILUSD: 'TVC:USOIL',
  USDOIL: 'TVC:USOIL',
  GBPUSD: 'FX:GBPUSD',
  EURDAI: 'FX:EURUSD',
  DAIJPY: 'FX:USDJPY',
  BTCDAI: 'BITSTAMP:BTCUSD',
  ETHDAI: 'BITSTAMP:ETHUSD',
  AUDDAI: 'OANDA:AUDUSD',
  DAICAD: 'FX:USDCAD',
  DAICHF: 'FX:USDCHF',
  XAUDAI: 'FX_IDC:XAUUSD',
  OILDAI: 'TVC:USOIL',
  DAIOIL: 'TVC:USOIL',
  GBPDAI: 'FX:GBPUSD',
};

const ChartWidget: React.FC<ChartWidgetProps & BaseProps> = ({ className, symbol, currentTheme }) => {
  const classes = useStyles();

  const loadChart = useCallback((symbol: string, currentTheme = 'light') => {
    const tradingSymbol = MAP[symbol.replace(/(DAI)|(AUSD)/, 'USD')];

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
