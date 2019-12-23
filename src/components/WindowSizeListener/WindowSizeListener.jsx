import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

class WindowSizeListener extends PureComponent {
  state = {
    windowHeight: undefined,
    windowWidth: undefined,
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(
    () =>
      this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      }),
    200,
  );

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}

WindowSizeListener.propTypes = {
  children: PropTypes.func.isRequired,
};

export default WindowSizeListener;
