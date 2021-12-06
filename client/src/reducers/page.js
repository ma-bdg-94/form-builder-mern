/* eslint-disable import/no-anonymous-default-export */

import {
  CLEAR_PAGE,
  CREATE_PAGE,
  GET_ADMIN_PAGES,
  GET_PAGE,
  GET_PAGES,
  PAGE_ERROR,
  REMOVE_PAGE,
  SAVE_PAGE,
  UPDATE_PAGE
} from '../actions/action_types'

const initialState = {
  pages: [],
  page: {},
  error: {},
  saved: null
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CREATE_PAGE:
      return { ...state, pages: [...state.pages, payload] }
    case GET_PAGES:
    case GET_ADMIN_PAGES:
      return { ...state, pages: payload, error: {} }
    case GET_PAGE:
      return { ...state, page: payload }
    case PAGE_ERROR:
      return { ...state, error: payload, pages: [], page: null }
    case REMOVE_PAGE:
      return { ...state, pages: state.pages.filter(p => p._id !== payload) }
    case SAVE_PAGE:
      return { ...state, saved: payload }
    case UPDATE_PAGE:
      return {
        ...state,
        pages: state.pages.map(p => (p._id === payload._id ? payload : p))
      }
    case CLEAR_PAGE:
      return { ...state, saved: null }
    default:
      return state
  }
}
