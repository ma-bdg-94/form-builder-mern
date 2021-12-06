import { THROW_ERROR, UNSET_ERROR } from '../actions/action_types'
import { v4 as uuidv4 } from 'uuid'

export const throwError = (msg) => dispatch => {
  const id = uuidv4()

  dispatch({
    type: THROW_ERROR,
    payload: { msg, id }
  })

  setTimeout(() => dispatch({
    type: UNSET_ERROR,
    payload: id
  }), 5000)
}
