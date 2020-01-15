import { combineReducers } from 'redux';
// Reducers
import graph from './graph.reducer';
import ui from './ui.reducer';

export default combineReducers({ graph, ui });
