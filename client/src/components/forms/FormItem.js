import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getForm, removeForm, saveForm } from '../../actions/form'
import Moment from 'react-moment'
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Card
} from 'reactstrap'

const FormItem = ({ removeForm, saveForm, form, getForm }) => {
  return (
    <Card className='mx-5 my-5'>
      <CardBody>
        <Link to={`/forms/${form._id}`} onClick={() => getForm(form._id)}>
          <CardTitle tag='h5'>{form && form.title}</CardTitle>
        </Link>
        <CardSubtitle className='mb-2 text-muted' tag='h6'>
          <Moment format='DD/MM/YYYY'>{form && form.createdAt}</Moment>
        </CardSubtitle>
        <Button
          className='mx-2'
          color='danger'
          outline
          onClick={ev => removeForm(form._id)}
        >
          Remove
        </Button>
        <Link to='/new_form'>
          <Button
            className='mx-2'
            color='info'
            outline
            onClick={ev => saveForm(form)}
          >
            Change Form Title
          </Button>
        </Link>
      </CardBody>
    </Card>
  )
}

FormItem.propTypes = {
  form: PropTypes.object.isRequired,
  removeForm: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired
}

// const mapStateToProps = state => ({
//   form: state.form
// })

export default connect(null, { removeForm, saveForm, getForm })(FormItem)
