import boomerang_actions from '../actions/boomerang';
import { connect } from 'react-redux';
import BoomerangTake from '../components/BoomerangTake'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

function mapStateToProps (state) {
  console.log("Map State to Props Boomerang")
  return {
    boomerang:state.boomerang
  };
}
const mapDispatchToProps = (dispatch) => {
  console.log("Map State to Props Boomerang")
  const actions = bindActionCreators(boomerang_actions, dispatch);
  return {
    onBoomerangPhotoCaptured: (data) => {
      console.log("onBoomerangPhotoCaptured")
      actions.Boomerang_PHOTO_CAPTURED(data);
      dispatch(push('/boomerang/player'))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(BoomerangTake);