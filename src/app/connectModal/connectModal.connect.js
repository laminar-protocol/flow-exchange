import { connect } from 'react-redux';
import types from 'types';

import Component from './connectModal';

const mapStateToProps = ({ ethereum }) => ({
  ethereum,
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch({ type: types.ethereumModalClose.changed });
  },
  onEthereumConnect: () => {
    dispatch({ type: types.ethereumEnable.requested });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
