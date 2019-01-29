import { combineReducers } from 'redux';
import ui from './ui';
import entities from './entities';

export default combineReducers({
  ui,
  entities,
});