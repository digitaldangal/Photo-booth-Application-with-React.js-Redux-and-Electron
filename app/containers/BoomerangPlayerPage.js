import boomerang_actions from '../actions/boomerang';
import { connect } from 'react-redux';
import BoomerangPlayer from '../components/BoomerangPlayer'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

function mapStateToProps (state) {
  console.log("Map State to Props Boomerang")
  return {
    images:state.boomerang.boomerang_photos
  };
}
const mapDispatchToProps = (dispatch) => {
    const actions = bindActionCreators(boomerang_actions, dispatch);
  return {
    onDone:() =>{
      dispatch(push('/start'))
    },
    onRedo:() =>{
      actions.Reset_Boomerang_Photos()
      dispatch(push('/boomerang/take'))
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(BoomerangPlayer);