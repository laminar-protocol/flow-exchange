import { connect } from 'react-redux';
import types from 'types';

import Component from './application';

const mapStateToProps = ({ setting }) => ({
  currentTheme: setting.currentTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onInit: () => {
    dispatch({ type: types.applicationInit.changed });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
