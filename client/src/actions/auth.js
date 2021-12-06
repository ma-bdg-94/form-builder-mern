import {
  GET_USER,
  GET_USER_FAIL,
  SIGNIN_DONE,
  SIGNIN_FAILED,
  SIGNUP_DONE,
  SIGNUP_FAILED,
  SIGN_OUT
} from '../actions/action_types'
import axios from 'axios'
import { throwError } from './error'
import setToken from '../utilities/setToken'

// ---get authenticated user---
export const getUser = () => async dispatch => {
  if (localStorage.token) setToken(localStorage.token)

  try {
    const res = await axios.get('/api/auth')

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: GET_USER_FAIL
    })
  }
}

// ---sign up new user---
export const signUp = ({ fullName, job, username, pin }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ fullName, job, username, pin })

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: SIGNUP_DONE,
      payload: res.data
    })

    dispatch(getUser())
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(throwError(error.msg)))
    }

    dispatch({
      type: SIGNUP_FAILED
    })
  }
}

// ---sign in user---
export const login = ({ username, pin }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, pin })

  try {
    const res = await axios.post('/api/auth', body, config)

    dispatch({
      type: SIGNIN_DONE,
      payload: res.data
    })

    dispatch(getUser())
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(throwError(error.msg)))
    }

    dispatch({
      type: SIGNIN_FAILED
    })
  }
}

// ---sign out user---
export const signOut = () => dispatch => {
  dispatch({
    type: SIGN_OUT
  })
}
