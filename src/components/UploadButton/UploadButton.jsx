import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

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
  }

  handleClick = () => {
    this.fileInputRef.current.click();
  };

  handleFileRead = filename => reader => {
    const { onUpload } = this.props;
    onUpload({ filename, textContent: reader.target.result });
  };

  handleFileUpload = e => {
    const file = e.target.files[0];
    const filename = file.name;
    const fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead(filename);
    fileReader.readAsText(file);
  };

  render() {
    const { buttonComponent } = this.props;
    return (
      <div>
        <input
          ref={this.fileInputRef}
          type="file"
          hidden
          onChange={this.handleFileUpload}
        />
        {React.cloneElement(buttonComponent, { onClick: this.handleClick })}
      </div>
    );
  }
}
