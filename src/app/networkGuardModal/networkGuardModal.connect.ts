import { connect } from 'react-redux';
import { AppState } from 'reducers';

import Component from './networkGuardModal';

const mapStateToProps = ({ ethereum: { network, isNetworkGuardModalActive } }: AppState) => ({
  network,
  isNetworkGuardModalActive,
});

export default connect(mapStateToProps, null)(Component);
