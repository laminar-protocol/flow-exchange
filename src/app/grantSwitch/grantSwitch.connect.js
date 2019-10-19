import { connect } from 'react-redux';
import types from 'types';
import { UINT256_MAX, UINT256_MIN } from 'helpers/unitHelper';
import Component from './grantSwitch';

const mapStateToProps = ({ token }, { symbol, visibleGranted }) => ({
  token,
  symbol,
  visibleGranted,
});

const mapDispatchToProps = (dispatch) => ({
  onQuery: (symbol) => {
    dispatch({ type: types.tokenAuthorization.requested, payload: { symbol } });
  },

  onGrant: (symbol, granted) => {
    if (granted) {
      dispatch({ type: types.tokenGrant.requested, payload: { symbol, balance: UINT256_MIN } });
    } else {
      dispatch({ type: types.tokenGrant.requested, payload: { symbol, balance: UINT256_MAX } });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
