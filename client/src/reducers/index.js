import { combineReducers } from 'redux';

const authReducer = (auth = null, action) => {
  if (action.type !== 'AUTH') {
    return auth;
  }

  return action.payload;
};

const editNoteReducer = (note = null, action) => {
  if (action.type !== 'EDIT_NOTE') {
    return note;
  }

  return action.payload;
};

export default combineReducers({
  auth: authReducer,
  editNote: editNoteReducer,
});
