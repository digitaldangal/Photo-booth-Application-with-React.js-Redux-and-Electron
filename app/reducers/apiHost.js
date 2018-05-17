import { handleActions } from 'redux-actions'
import actions from '../actions/apiHost'

export default handleActions({
  [actions.UpdateApi]: (state, action) => {
    return { ...state, ...action.payload }
  }
}, {})
