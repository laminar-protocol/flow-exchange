import { connect } from 'react-redux';
import types from 'types';

import Component from './balance';

const mapStateToProps = ({ token }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  onBalanceQuery: (symbol) => {
    dispatch({ type: types.tokenBalance.requested, payload: { symbol } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
