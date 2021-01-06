import { combineReducers } from 'redux'
import reducer from './reducer/index'

const reducers = combineReducers({
    authReducer: reducer
  })

export default reducers
