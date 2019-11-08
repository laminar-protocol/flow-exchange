import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import types from 'types';

import Component from './faucet';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onOpenFaucet: (symbol: string, amount: string) => {
    dispatch({ type: types.faucet.dai.requested, payload: { amount, symbol } });
  },
});

export default connect(null, mapDispatchToProps)(Component);
