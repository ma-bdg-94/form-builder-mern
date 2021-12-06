/* eslint-disable import/no-anonymous-default-export */
import { THROW_ERROR, UNSET_ERROR } from '../actions/action_types'

const initialState = []

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case THROW_ERROR:
      return [...state, payload]
    case UNSET_ERROR:
      return state.filter(er => er.id !== payload)
    default:
      return state
  }
}
