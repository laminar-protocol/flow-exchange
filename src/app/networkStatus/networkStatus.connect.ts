import { connect } from 'react-redux';
import { AppState } from 'reducers';

import Component from './networkStatus';

const mapStateToProps = ({ ethereum: { isConnected, isConnecting, isEnabling, network } }: AppState) => ({
  isConnected,
  isConnecting,
  isEnabling,
  network,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
