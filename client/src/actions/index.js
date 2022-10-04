import axios from 'axios';

export const getAuth = () => async (dispatch) => {
  const { data } = await axios.get('/api/current_user');

  if (!data) {
    // user is not authintecated
    return dispatch({
      type: 'AUTH',
      payload: false,
    });
  }

  dispatch({
    type: 'AUTH',
    payload: data._id,
  });
};
