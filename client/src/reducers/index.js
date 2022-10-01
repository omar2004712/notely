import { combineReducers } from 'redux';

const authReducer = (auth = null, action) => {
  if (action.type !== 'AUTH') {
    return auth;
  }

  return action.payload;
};

export default combineReducers({
  auth: authReducer,
});
