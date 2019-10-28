import { connect } from 'react-redux';
import types from 'types';

import Component from './swap';

const mapStateToProps = ({
  market, swap, spotRate,
}) => ({
  market, swap, spotRate,
});

const mapDispatchToProps = (dispatch) => ({
  onFromSymbolChange: (symbol) => {
    dispatch({ type: types.swap.fromSymbol.changed, payload: symbol });
  },
  onToSymbolChange: (symbol) => {
    dispatch({ type: types.swap.toSymbol.changed, payload: symbol });
  },
  onFromAmountChange: (amount) => {
    dispatch({ type: types.swap.fromAmount.changed, payload: amount });
  },
  onToAmountChange: (amount) => {
    dispatch({ type: types.swap.toAmount.changed, payload: amount });
  },
  onSwapSymbol: (fromSymbol, toSymbol) => {
    dispatch({ type: types.swap.fromSymbol.changed, payload: toSymbol });
    dispatch({ type: types.swap.toSymbol.changed, payload: fromSymbol });
  },
  onSwap: (isRedeem) => {
    if (isRedeem) {
      dispatch({ type: types.swap.redeem.requested });
    } else {
      dispatch({ type: types.swap.mint.requested });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
