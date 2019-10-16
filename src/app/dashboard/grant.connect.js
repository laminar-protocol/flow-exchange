import { connect } from 'react-redux';
import types from 'types';
import { UINT256_MAX, UINT256_MIN } from 'helpers/unitHelper';
import Component from './grant';

const mapStateToProps = ({ dai }) => ({
  dai,
});

const mapDispatchToProps = (dispatch) => ({
  onDaiAuthorizationQuery: () => {
    dispatch({ type: types.daiAuthorization.requested });
  },

  onDaiGrant: (granted) => {
    if (granted) {
      dispatch({ type: types.daiGrant.requested, payload: UINT256_MAX });
    } else {
      dispatch({ type: types.daiGrant.requested, payload: UINT256_MIN });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
