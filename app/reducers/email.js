import { handleActions } from 'redux-actions';
import actions from '../actions/email';

const INITIAL_STATE = {
  email:'ambition.t109@gmail.com',
  password:'Generalpassword1'
};

export default handleActions({
  [actions.ChangeEmailSetting]: (state, action) => {
    // return { ...state, shouldStopCapture:false}
    return { ...state, ...action.payload,
    };
  },
}, INITIAL_STATE);

