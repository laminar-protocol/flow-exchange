import { connect } from 'react-redux';
import { actions } from 'types';
import { Dispatch } from 'redux';
import { AppState } from 'reducers';

import Component from './connectModal';

const mapStateToProps = ({ ethereum: { isConnectModalActive, isConnecting } }: AppState) => ({
  isConnectModalActive,
  isConnecting,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => {
    dispatch(actions.ethereum.modalClose.changed());
  },
  onEthereumConnect: () => {
    dispatch(actions.ethereum.enable.requested());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
