import { connect } from 'react-redux';
import { AppState } from 'reducers';
import { Dispatch } from 'redux';
import { actions } from 'types';

import Component from './wallet';

const mapStateToProps = ({ ethereum: { account } }: AppState) => ({
  account,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onWalletConnect: () => {
    dispatch(actions.ethereum.modalOpen.changed());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
