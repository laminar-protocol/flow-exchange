import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import types, { actions } from 'types';
import { AppState } from 'reducers';

import Component from './swap';

const mapStateToProps = ({
  swap, spotRate,
}: AppState) => ({
  swap, spotRate,
});

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
