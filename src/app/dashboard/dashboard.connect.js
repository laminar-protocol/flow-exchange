import { connect } from 'react-redux';
import Component from './dashboard';

const mapStateToProps = ({ dai }) => ({
  dai,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
