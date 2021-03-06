import { combineReducers } from 'redux';
// Reducers
import graph from './graph.reducer';
import ui from './ui.reducer';
import coloring from './coloring.reducer';
import radius from './radius.reducer';
import setting from './setting.reducer';
import algo from './algo.reducer';

export default combineReducers({
  graph,
  ui,
  radius,
  coloring,
  setting,
  algo,
});
