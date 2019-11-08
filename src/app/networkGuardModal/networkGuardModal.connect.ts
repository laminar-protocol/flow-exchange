import { connect } from 'react-redux';
import { AppState } from 'reducers';

import Component from './networkGuardModal';

const mapStateToProps = ({ ethereum: { isNetworkGuardModalActive } }: AppState) => ({
  isNetworkGuardModalActive,
});

export default connect(mapStateToProps, null)(Component);
