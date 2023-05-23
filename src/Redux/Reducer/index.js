import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import timeOut from './timeout';

const rootReducer = combineReducers({
  player,
  token,
  timeOut,
});

export default rootReducer;
