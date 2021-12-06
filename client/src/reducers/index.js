import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import error from './error'
import auth from './auth'
import page from './page'
import form from './form'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['page', 'form']
}

const root = combineReducers({
  error,
  auth,
  page,
  form
})

export default persistReducer(persistConfig, root)
