import Axios from 'axios'
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  PROFIL_SAVE_REQUEST,
  PROFIL_SAVE_SUCCESS,
  PROFIL_SAVE_FAIL,
  USER_SIGN_OUT,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST
} from '../constants/constantsUser'

const detailsUsers = userId => async dispatch => {
  try {
    dispatch({ type: USERS_LIST_REQUEST, payload: userId })
    const { data } = await Axios.get('/api/users/profile/' + userId)
    dispatch({ type: USERS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

const listUsers = () => async dispatch => {
  try {
    dispatch({ type: USERS_LIST_REQUEST })
    const { data } = await Axios.get('/api/users/')
    dispatch({ type: USERS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}



 const registerUser = (name, email, password,photo,isAdmin) =>async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password,photo,isAdmin });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message });
  }
  };





const signin = (email, password) => async dispatch => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    //utilisation des cookies

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

const update = ({ userId, name, email, password, photo }) => async (
  dispatch,
  getState
) => {
  const {
    userSignin: { userInfo }
  } = getState()
  dispatch({
    type: PROFIL_SAVE_REQUEST,
    payload: { userId, name, email, password, photo }
  })
  try {
    const { data } = await Axios.put(
      '/api/users/profile/' + userId,
      { name, email, password, photo },
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      }
    )
    dispatch({ type: PROFIL_SAVE_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: PROFIL_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

const signout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_SIGN_OUT })
}

export { signin, signout, update, detailsUsers,registerUser }
