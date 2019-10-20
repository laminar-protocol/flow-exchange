import { connect } from 'react-redux';
import types from 'types';

import Component from './wallet';

const mapStateToProps = ({ ethereum }) => ({
  ethereum,
});

const mapDispatchToProps = (dispatch) => ({
  onWalletConnect: () => {
    dispatch({ type: types.ethereumModalOpen.changed });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
