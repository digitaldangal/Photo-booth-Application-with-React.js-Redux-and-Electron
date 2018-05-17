import { handleActions } from 'redux-actions'
import actions from '../actions/boomerang'

const INITIAL_STATE = {
  boomerang_photos: [],
  Boomerang_Photos_Once_CAPTURED: 10
}

export default handleActions({
  [actions.Boomerang_PHOTO_CAPTURED]: (state, action) => {
    // return { ...state, shouldStopCapture:false}
    return { ...state, boomerang_photos: action.payload
    }
  },
  [actions.Reset_Boomerang_Photos]: (state, action) => {
    // return { ...state, shouldStopCapture:false}
    return { ...state, boomerang_photos: []
    }
  }
}, INITIAL_STATE)
