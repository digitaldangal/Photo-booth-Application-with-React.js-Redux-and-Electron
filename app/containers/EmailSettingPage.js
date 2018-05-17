import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import EmailSetting from '../components/EmailSetting';
import userActions from '../actions/email';

const mapStateToProps = (state) => {
	console.log("mapStatetoProps",state);
  return {...state.emailInfo}
};

const mapDispatchToProps = (dispatch) => {
	console.log("mapDispatchToProps");
  const actions = bindActionCreators(userActions, dispatch);
  return {
    onChangeEmailSetting: (data) => {
      console.log(data)
      actions.ChangeEmailSetting(data);
      dispatch(push('/'))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSetting);
