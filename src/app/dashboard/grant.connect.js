import { connect } from 'react-redux';
import types from 'types';

import Component from './grant';

const mapStateToProps = ({ dai }) => ({
  dai,
});

const mapDispatchToProps = (dispatch) => ({
  onDaiAuthorizationQuery: () => {
    dispatch({ type: types.daiAuthorization.requested });
  },

  onDaiGrant: (granted) => {
    dispatch({ type: types.daiGrant.requested });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
