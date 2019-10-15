import { connect } from 'react-redux';
import types from 'types';

import Component from './menu';

const mapStateToProps = ({ setting, ethereum }) => ({
  setting,
  ethereum,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTheme: (value) => {
    dispatch({ type: types.theme.changed, value: value ? 'dark' : 'light' });
  },
  onWalletConnect: (ethereum) => {
    dispatch({ type: types.ethereumModalOpen.changed });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
