import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import Start from '../components/Start'
import api_actions from '../actions/apiHost'


const mapStateToProps = (state) => {
  console.log('mapStatetoProps on StartPage', state)
  return state
}

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps on StartPage')
  const apis = bindActionCreators(api_actions, dispatch)

  return {
    onUpdate: (data) => {
      console.log('API UPDATE', data)
      apis.UpdateApi(data)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)
