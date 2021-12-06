/* eslint-disable import/no-anonymous-default-export */

import {
  CLEAR_FORM,
  INIT_FORM,
  GET_ADMIN_FORMS,
  GET_FORM,
  GET_FORMS,
  FORM_ERROR,
  REMOVE_FORM,
  SAVE_FORM,
  UPDATE_FORM,
  ASSIGN_PAGE,
  ADD_QUESTION,
  REMOVE_QUESTION,
  UPDATE_QUESTION,
  ANSWER
} from '../actions/action_types'

const initialState = {
  forms: [],
  form: {},
  error: {},
  saved: null
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case INIT_FORM:
      return { ...state, forms: [...state.forms, payload], form: payload }
    case GET_FORMS:
    case GET_ADMIN_FORMS:
      return { ...state, forms: payload, error: {} }
    case GET_FORM:
      return { ...state, form: payload }
    case FORM_ERROR:
      return { ...state, error: payload, forms: [], form: null }
    case REMOVE_FORM:
      return { ...state, forms: state.forms.filter(f => f._id !== payload) }
    case SAVE_FORM:
      return { ...state, saved: payload }
    case UPDATE_FORM:
      return {
        ...state,
        forms: state.forms.map(fr => (fr._id === payload._id ? payload : fr))
      }
    case CLEAR_FORM:
      return { ...state, saved: null }
    case ASSIGN_PAGE:
      return { ...state, form: { ...state.form, pages: payload } }
    case ADD_QUESTION:
      return { ...state, form: { ...state.form, questions: payload } }
    case REMOVE_QUESTION:
      return {
        ...state,
        form: {
          ...state.form,
          questions: state.form.questions.filter(q => q._id !== payload)
        }
      }
    case UPDATE_QUESTION:
      return {
        ...state,
        form: {
          ...state.form,
          questions: state.form.questions.map(q =>
            q._id === payload._id ? payload : q
          )
        }
      }
    case ANSWER:
      return {
        ...state,
        form: {
          ...state.form,
          ...state.form.questions,
          answers: payload
        }
      }
    default:
      return state
  }
}
