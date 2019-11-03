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
  onFromAmountChange: (amount: string) => {
    dispatch({ type: types.swap.fromAmount.changed, payload: amount });
  },
  onToAmountChange: (amount: string) => {
    dispatch({ type: types.swap.toAmount.changed, payload: amount });
  },
  onSwapSymbol: (fromSymbol: string, toSymbol: string) => {
    dispatch({ type: types.swap.fromSymbol.changed, payload: toSymbol });
    dispatch({ type: types.swap.toSymbol.changed, payload: fromSymbol });
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
