import { connect } from 'react-redux';
import types from 'types';

import Component from './swap';

const mapStateToProps = ({
  market, swap, token,
}) => ({ token, market, swap });

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
  onSwap: () => {
    dispatch({ type: types.swap.requested });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
