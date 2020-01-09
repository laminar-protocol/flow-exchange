import { connect } from 'react-redux';
import { AppState } from 'reducers';

import Component from './networkGuardModal';

const mapStateToProps = ({ ethereum: { isNetworkGuardModalActive, network } }: AppState) => ({
  isNetworkGuardModalActive,
  network,
});

export default connect(mapStateToProps, null)(Component);
