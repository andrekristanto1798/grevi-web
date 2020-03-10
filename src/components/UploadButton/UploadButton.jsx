import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Components
import { Button, Modal, Grid, Header, Icon } from 'semantic-ui-react';
import GraphFileCard from '../GraphFileCard';
// Graph Data
import { graphFileList, emptyGraphData } from '../../data/graphs';
// Styles
import styles from './styles.scss';
import LinkButton from '../LinkButton';

const graphFormat = `
JSON => { nodes: Node[], links: Link[] }\n
Node
- id: Integer || String
- [key]: value
Link:
- id: Integer || String
- source: Integer || String (= node's id)
- target: Integer || String (= node's id)
- [key]: value\n
`;

export default class UploadButton extends PureComponent {
  static propTypes = {
    onUpload: PropTypes.func.isRequired,
    buttonComponent: PropTypes.node,
  };

  static defaultProps = {
    buttonComponent: <Button icon="upload" size="mini" />,
  };

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = { open: true };
  }

  handleClick = () => {
    this.fileInputRef.current.click();
  };

  handleFileRead = filename => reader => {
    const { onUpload } = this.props;
    onUpload({ filename, textContent: reader.target.result });
    this.setState({ open: false });
    this.fileInputRef.current.value = '';
  };

  handleFileUpload = e => {
    const file = e.target.files[0];
    const filename = file.name;
    const fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead(filename);
    fileReader.readAsText(file);
  };

  handleFileLocalLoad = ({ name, graph }) => () => {
    const { onUpload } = this.props;
    onUpload({ filename: name, textContent: JSON.stringify(graph) });
    this.setState({ open: false });
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { buttonComponent } = this.props;
    const { open } = this.state;
    return (
      <div>
        <input
          ref={this.fileInputRef}
          type="file"
          hidden
          onChange={this.handleFileUpload}
        />
        <Modal
          open={open}
          onClose={this.handleClose}
          trigger={React.cloneElement(buttonComponent, {
            title: 'Upload Graph',
            onClick: this.handleOpen,
          })}
        >
          <Modal.Header>Upload Your Graph</Modal.Header>
          <Modal.Content>
            <Grid divided style={{ height: 'fit-content' }}>
              <Grid.Row columns={2}>
                <Grid.Column style={{ maxHeight: 500, overflow: 'auto' }}>
                  <Header.Subheader>
                    Try out sample graphs below or start{' '}
                    <LinkButton
                      onClick={this.handleFileLocalLoad(emptyGraphData)}
                    >
                      Empty Graph
                    </LinkButton>
                  </Header.Subheader>
                  <div className={styles.cardContainer}>
                    {graphFileList.map(graphData => (
                      <GraphFileCard
                        {...graphData}
                        key={graphData.name}
                        onClick={this.handleFileLocalLoad(graphData)}
                      />
                    ))}
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className={styles.browseFromMyComputerContainer}>
                    Upload your graph in JSON file with following format:
                    <pre>{graphFormat}</pre>
                    <Button
                      size="medium"
                      color="facebook"
                      onClick={this.handleClick}
                    >
                      <Icon name="computer" />
                      Browse From My Computer
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
