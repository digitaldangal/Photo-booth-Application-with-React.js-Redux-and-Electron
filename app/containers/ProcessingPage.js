import { connect } from 'react-redux';
import photo_actions from '../actions/photo';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PhotoProcessing from '../components/PhotoProcessing';

const mapStateToProps = (state) => {
	console.log("mapStatetoProps on StartPage",state);
  return state;
};

const mapDispatchToProps = (dispatch) => {
	  const user = bindActionCreators(photo_actions, dispatch);
  return {
    onSavePrintablePhoto: (data) => {
      user.SavePrintableImage(data);
    },
	onEmailPassed: ()=>{
  		dispatch(push('/photobooth'));
  	}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoProcessing);
