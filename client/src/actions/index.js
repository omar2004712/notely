import axios from 'axios';

export const getAuth = () => async (dispatch) => {
  const { data } = await axios.get('/api/current_user');

  dispatch({
    type: 'AUTH',
    payload: data._id,
  });
};
