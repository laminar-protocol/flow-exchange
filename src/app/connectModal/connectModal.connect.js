import { connect } from 'react-redux';
import types from 'types';

import Component from './connectModal';

const mapStateToProps = ({ ethereum }) => ({
  ethereum,
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch({ type: types.ethereum.modalClose.changed });
  },
  onEthereumConnect: () => {
    dispatch({ type: types.ethereum.enable.requested });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
