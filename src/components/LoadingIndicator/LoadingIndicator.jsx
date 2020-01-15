import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { selectLoading } from '../../selectors/ui.selector';

function LoadingIndicator({ loading }) {
  if (!loading) return null;
  return (
    <Dimmer active>
      <Loader indeterminate>Loading</Loader>
    </Dimmer>
  );
}

const mapStateToProps = state => {
  const loading = selectLoading(state);
  return { loading };
};

LoadingIndicator.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(LoadingIndicator);
