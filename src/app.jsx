import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Route from './routes';
import rootReducer from './reducers';

import createStore from './store/createStore';

import 'app.scss';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
    <Route />
  </Provider>,
  document.getElementById('app'),
);
