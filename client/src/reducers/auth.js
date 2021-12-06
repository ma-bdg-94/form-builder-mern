/* eslint-disable import/no-anonymous-default-export */

import {
  GET_USER,
  GET_USER_FAIL,
  SIGNIN_DONE,
  SIGNIN_FAILED,
  SIGNUP_DONE,
  SIGNUP_FAILED,
  SIGN_OUT
} from '../actions/action_types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_USER:
      return {
        ...state,
        isAuth: true,
        user: payload
      }
    case SIGNUP_DONE:
    case SIGNIN_DONE:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuth: true
      }
    case SIGNUP_FAILED:
    case SIGNIN_FAILED:
    case GET_USER_FAIL:
    case SIGN_OUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false
      }
    default:
      return state
  }
}
