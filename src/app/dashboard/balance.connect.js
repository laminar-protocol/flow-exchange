import { connect } from 'react-redux';
import types from 'types';

import Component from './balance';

const mapStateToProps = ({ dai }) => ({
  dai,
});

const mapDispatchToProps = (dispatch) => ({
  onDaiBalanceQuery: () => {
    dispatch({ type: types.daiBalance.requested });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
