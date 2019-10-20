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
    dispatch({ type: types.swapFromSymbol.changed, payload: symbol });
  },
  onToSymbolChange: (symbol) => {
    dispatch({ type: types.swapToSymbol.changed, payload: symbol });
  },
  onFromAmountChange: (amount) => {
    dispatch({ type: types.swapFromAmount.changed, payload: amount });
  },
  onToAmountChange: (amount) => {
    dispatch({ type: types.swapToAmount.changed, payload: amount });
  },
  onSwapSymbol: (fromSymbol, toSymbol) => {
    dispatch({ type: types.swapFromSymbol.changed, payload: toSymbol });
    dispatch({ type: types.swapToSymbol.changed, payload: fromSymbol });
  },
  onSwap: (isRedeem) => {
    if (isRedeem) {
      dispatch({ type: types.swapRedeem.requested });
    } else {
      dispatch({ type: types.swapMint.requested });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
