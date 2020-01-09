import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import types, { actions } from 'types';
import { AppState } from 'reducers';
import { addresses, tokens, isTokenSymbol, isBaseTokenSymbol, TokenSymbol } from 'config';
import { caculate } from 'helpers/exchangeRateHelper';

import Swap from './swap';

const defaultPool = addresses.pool;

const mapStateToProps = ({
  swap: { fromAmount, fromSymbol, toAmount, toSymbol, isSwapping },
  liquidityPool: {
    spread: { states },
  },
}: AppState) => {
  // ----------
  // Common
  // ----------
  const availableSymbols = Object.keys(tokens) as TokenSymbol[];
  const isRedeem = !isBaseTokenSymbol(fromSymbol);

  // ----------
  // Symbols
  // ----------
  const flowSymbols = availableSymbols.filter(symbol => !isBaseTokenSymbol(symbol));
  const baseSymbols = availableSymbols.filter(symbol => isBaseTokenSymbol(symbol));

  const availableFromSymbols = isRedeem ? flowSymbols : baseSymbols;
  const availableToSymbols = isRedeem ? baseSymbols : flowSymbols;

  // ----------
  // Spread
  // ----------
  let askSpread;
  let bidSpread;
  let isLoadingSpread = false;
  const baseSymbol = isRedeem ? fromSymbol : toSymbol;
  if (isTokenSymbol(baseSymbol)) {
    const spreadKey = [defaultPool, tokens[baseSymbol].address].toString();
    const spread = states[spreadKey];
    if (spread) {
      isLoadingSpread = spread.loading;
      if (spread.value) {
        askSpread = spread.value.ask;
        bidSpread = spread.value.bid;
      }
    }
  }

  return {
    availableSymbols,
    availableFromSymbols,
    availableToSymbols,

    fromAmount,
    fromSymbol,
    toAmount,
    toSymbol,
    isRedeem,
    isLoadingSpread,
    isSwapping,

    askSpread,
    bidSpread,

    isValid: true,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFromSymbolChange: (symbol: string) => {
    dispatch(actions.swap.fromAmount.changed(undefined));
    dispatch(actions.swap.fromSymbol.changed(symbol));
  },
  onToSymbolChange: (symbol: string) => {
    dispatch(actions.swap.toAmount.changed(undefined));
    dispatch(actions.swap.toSymbol.changed(symbol));
  },
  onFromAmountChange: (amount: string, rate?: number, spread?: number) => {
    dispatch(actions.swap.fromAmount.changed(amount));
    if (rate && spread) {
      const toAmount = caculate(Number(amount), spread, rate, 'bid');
      dispatch(actions.swap.toAmount.changed(toAmount.toString()));
    }
  },
  onToAmountChange: (amount: string, rate?: number, spread?: number) => {
    dispatch(actions.swap.toAmount.changed(amount));
    if (rate && spread) {
      const fromAmount = caculate(Number(amount), spread, rate, 'ask');
      dispatch(actions.swap.fromAmount.changed(fromAmount.toString()));
    }
  },
  onSwapSymbol: (fromSymbol: string, toSymbol: string, fromAmount?: string, toAmount?: string) => {
    dispatch(actions.swap.fromSymbol.changed(toSymbol));
    dispatch(actions.swap.toSymbol.changed(fromSymbol));
    dispatch(actions.swap.fromAmount.changed(toAmount));
    dispatch(actions.swap.toAmount.changed(fromAmount));
  },
  onSwap: (isRedeem: boolean) => {
    if (isRedeem) {
      dispatch({ type: types.swap.redeem.requested });
    } else {
      dispatch({ type: types.swap.mint.requested });
    }
  },
  onFetchLiquidityPoolSpread: (otherSymbol: string) => {
    if (isTokenSymbol(otherSymbol)) {
      dispatch(actions.liquidityPool.spread.requested({ id: [defaultPool, tokens[otherSymbol].address] }));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Swap);
