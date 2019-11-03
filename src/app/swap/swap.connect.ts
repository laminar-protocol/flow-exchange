import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import types, { actions } from 'types';
import { AppState } from 'reducers';
import { addresses, tokens, isTokenSymbol } from 'config';

import Swap from './swap';

const defaultPool = addresses.pool;

const mapStateToProps = ({
  swap, liquidityPool: { spread: { states } },
}: AppState) => {
  let spread;
  const otherSymbol = swap.isRedeem ? swap.fromSymbol : swap.toSymbol;
  if (isTokenSymbol(otherSymbol)) {
    spread = states[[defaultPool, tokens[otherSymbol].address].toString()];
  }
  return {
    swap,
    spread: spread || {},
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFromSymbolChange: (symbol: string) => {
    dispatch(actions.swap.fromSymbol.changed(symbol));
  },
  onToSymbolChange: (symbol: string) => {
    dispatch(actions.swap.toSymbol.changed(symbol));
  },
  onFromAmountChange: (amount: string, rate?: number) => {
    dispatch(actions.swap.fromAmount.changed(amount));
    if (rate != null) {
      const toAmount = Number(amount) * rate;
      dispatch(actions.swap.toAmount.changed(toAmount.toString()));
    }
  },
  onToAmountChange: (amount: string, rate?: number) => {
    dispatch(actions.swap.toAmount.changed(amount));
    if (rate != null) {
      const fromAmount = Number(amount) / rate;
      dispatch(actions.swap.fromAmount.changed(fromAmount.toString()));
    }
  },
  onSwapSymbol: (fromSymbol: string, toSymbol: string, fromAmount: string, toAmount: string) => {
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
  fetchLiquidityPoolSpread: (otherSymbol: string) => {
    if (isTokenSymbol(otherSymbol)) {
      dispatch(actions.liquidityPool.spread.requested({ id: [defaultPool, tokens[otherSymbol].address] }));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Swap);
