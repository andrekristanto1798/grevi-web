import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Actions
import { Input, Button } from 'semantic-ui-react';
import * as graphAction from '../../../actions/graph.action';
// Components
import UploadButton from '../../../components/UploadButton';
// Selectors
import { selectGraphFilename } from '../../../selectors/graph.selector';
// Utils
import extractFilename from '../../../utils/extractFilename';
// Styles
import styles from './styles.scss';

const GraphFileSection = ({
  filename,
  changeFilename,
  loadGraph,
  downloadGraph,
}) => {
  const handleChangeFilename = React.useCallback(event => {
    changeFilename(event.target.value);
  });
  const handleUpload = React.useCallback(uploadData => {
    changeFilename(extractFilename(uploadData.filename));
    loadGraph(JSON.parse(uploadData.textContent));
  });
  return (
    <div className={styles.graphFileContainer}>
      <Input
        className={styles.graphFilename}
        value={filename}
        onChange={handleChangeFilename}
      />
      <div className={styles.graphFileMenu}>
        <Button size="mini" icon="save" onClick={downloadGraph} />
        <UploadButton onUpload={handleUpload} />
      </div>
    </div>
  );
};

GraphFileSection.propTypes = {
  filename: PropTypes.string.isRequired,
  changeFilename: PropTypes.func.isRequired,
  loadGraph: PropTypes.func.isRequired,
  downloadGraph: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const filename = selectGraphFilename(state);
  return { filename };
};

const actions = {
  changeFilename: graphAction.changeFilename,
  loadGraph: graphAction.loadGraphFile,
  downloadGraph: graphAction.downloadGraphFile,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphFileSection);
