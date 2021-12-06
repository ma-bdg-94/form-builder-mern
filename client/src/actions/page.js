import axios from 'axios'
import { CLEAR_PAGE, CREATE_PAGE, GET_PAGE, GET_PAGES, PAGE_ERROR, REMOVE_PAGE, SAVE_PAGE, UPDATE_PAGE } from './action_types'
import { throwError } from './error'

// ---get all pages sorted by date creation: display the most recent first---
export const getPages = () => async dispatch => {
  try {
    const res = await axios.get('/api/pages')

    dispatch({
      type: GET_PAGES,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: PAGE_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---get one page by link---
export const getPage = (link) => async dispatch => {
  try {
    const res = await axios.get(`/api/pages/${link}`)

    dispatch({
      type: GET_PAGE,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: PAGE_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---get all pages sorted of current admin by date creation: display the most recent first---
export const getMyPages = () => async dispatch => {
  try {
    const res = await axios.get('/api/pages/admin/me')

    dispatch({
      type: GET_PAGES,
      payload: res.data
    })
  } catch (er) {
    dispatch({
      type: PAGE_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---add new page---
export const createPage = newPage => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // const body = JSON.stringify({ title, desc })

  try {
    const res = await axios.post('/api/pages', newPage, config)

    dispatch({
      type: CREATE_PAGE,
      payload: res.data
    })
  } catch (er) {
    const errors = er.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(throwError(error.msg)))
    }

    dispatch({
      type: PAGE_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---remove page---
export const removePage = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/pages/${id}`)

    dispatch({
      type: REMOVE_PAGE,
      payload: id
    })
  } catch (er) {
    dispatch({
      type: PAGE_ERROR,
      payload: er.response.data.msg
    })
  }
}

// ---Update Page---
export const savePage = page => dispatch => {
  dispatch({
      type: SAVE_PAGE,
      payload: page
  })
}

export const updatePage = (id, updatedPage) => async dispatch => {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

  try {
    const res = await axios.put(`/api/pages/${id}`, updatedPage, config)

    dispatch({
      type: UPDATE_PAGE,
      payload: updatedPage
    })
  } catch (er) {
    dispatch({
      type: PAGE_ERROR,
      payload: er.response.data.msg
    })
  }
}

export const clearPage = () => dispatch => {
  dispatch({
      type: CLEAR_PAGE,
  })
}
