import axios from 'axios'
import {
  CLEAR_FORM,
  GET_FORMS,
  FORM_ERROR,
  REMOVE_FORM,
  SAVE_FORM,
  UPDATE_FORM,
  INIT_FORM,
  ADD_QUESTION,
  REMOVE_QUESTION,
  GET_FORM,
  ASSIGN_PAGE
} from './action_types'
import { throwError } from './error'

// ---get all forms sorted by date creation: display the most recent first---
export const getForms = () => async dispatch => {
  try {
    const res = await axios.get('/api/forms')

    dispatch({
      type: GET_FORMS,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---get one form by id---
export const getForm = id => async dispatch => {
  try {
    const res = await axios.get(`/api/forms/${id}`)

    dispatch({
      type: GET_FORM,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---get all FORMs sorted of current admin by date creation: display the most recent first---
export const getMyForms = () => async dispatch => {
  try {
    const res = await axios.get('/api/forms/admin/me')

    dispatch({
      type: GET_FORMS,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---add new FORM---
export const initForm = newForm => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/forms', newForm, config)

    dispatch({
      type: INIT_FORM,
      payload: res.data
    })
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(throwError(error.msg)))
    }

    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---remove FORM---
export const removeForm = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/forms/${id}`)

    dispatch({
      type: REMOVE_FORM,
      payload: id
    })
  } catch (er) {
    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---Update FORM---
export const saveForm = form => dispatch => {
  dispatch({
    type: SAVE_FORM,
    payload: form
  })
}

export const updateForm = (id, updatedForm) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put(`/api/forms/${id}`, updatedForm, config)

    dispatch({
      type: UPDATE_FORM,
      payload: updatedForm
    })
  } catch (er) {
    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

export const clearForm = () => dispatch => {
  dispatch({
    type: CLEAR_FORM
  })
}

// ---assign form to a page---
export const assignPage = (formId, pageId) => async dispatch => {
  try {
    const res = await axios.post(`/api/forms/page/${formId}/${pageId}`)

    dispatch({
      type: ASSIGN_PAGE,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---add a question---
export const addQuestion = (newQuest, formId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(
      `/api/forms/question/${formId}`,
      newQuest,
      config
    )

    dispatch({
      type: ADD_QUESTION,
      payload: res.data
    })
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(throwError(error.msg)))
    }

    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---remove a question---
export const removeQuestion = (formId, questId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/forms/question/${formId}/${questId}`)

    dispatch({
      type: REMOVE_QUESTION,
      payload: questId
    })
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(throwError(error.msg)))
    }

    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---update a question---
export const updateQuestion = (formId, questId) => async dispatch => {
  try {
    const res = await axios.put(`/api/forms/question/${formId}/${questId}`)

    dispatch({
      type: REMOVE_QUESTION,
      payload: res.data
    })
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(throwError(error.msg)))
    }

    dispatch({
      type: FORM_ERROR,
      payload: er.response.data.msg
    })
  }
}
