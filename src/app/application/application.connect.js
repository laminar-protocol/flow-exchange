import { connect } from 'react-redux';
import types from 'types';

import Component from './application';

const mapStateToProps = ({ setting }) => ({
  currentTheme: setting.currentTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => {
    dispatch({ type: types.app.init.trigger });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
