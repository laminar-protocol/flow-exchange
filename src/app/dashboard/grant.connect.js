import { connect } from 'react-redux';
import types from 'types';
import { UINT256_MAX, UINT256_MIN } from 'helpers/unitHelper';
import Component from './grant';

const mapStateToProps = ({ token }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  onAuthorizationQuery: (symbol) => {
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
