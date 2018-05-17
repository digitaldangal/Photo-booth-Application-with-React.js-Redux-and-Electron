import SimpleForm from '../components/MyTemp'
import { reduxForm } from 'redux-form'

export default reduxForm({
  form: 'simpleForm',
})(SimpleForm)
