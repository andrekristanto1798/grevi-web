import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Route from './routes';
import rootReducer from './reducers';

import createStore from './store/createStore';

// Semantic ui global css
import 'semantic-ui-css/semantic.min.css';
// App scss
import 'app.scss';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
    <Route />
  </Provider>,
  document.getElementById('app'),
);
