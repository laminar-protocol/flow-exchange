import { connect } from 'react-redux';

import Component from './networkStatus';

const mapStateToProps = ({ ethereum }) => ({
  ethereum,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
