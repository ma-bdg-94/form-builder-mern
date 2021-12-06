import { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

// ---import components---
import ErrorBlock from '../ErrorBlock'

// ---implement redux---
import { connect } from 'react-redux'
import { initForm, updateForm, clearForm } from '../../actions/form'

const InitForm = ({ savedForm, updateForm, clearForm, initForm, error }) => {
  const [formData, setFormData] = useState({
    title: savedForm ? savedForm.title : ''
  })

  const { title } = formData

  const handleChange = ev => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value
    })
  }

  const history = useHistory()
  const redirectTo = () => {
    let url = '/build_form'
    history.push(url)
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    redirectTo()
    if (savedForm === true) {
      updateForm(savedForm._id, formData)
      clearForm()
    } else {
      initForm({ title })
      if (!error) redirectTo()
    }
  }

  return (
    <div className='landing py-5 my-5'>
      <h1 className='mb-4'>Initate a new form</h1>
      <form className='mx-5 px-5'>
        <fieldset>
          <div className='form-group my-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Set a title for the form'
              name='title'
              value={title}
              onChange={ev => handleChange(ev)}
            />
          </div>
        </fieldset>
        <div>
          <button
            type='button'
            className='btn btn-primary btn-lg mx-1 my-2'
            onClick={ev => handleSubmit(ev)}
          >
            Initiate the form
          </button>
        </div>
        <ErrorBlock />
      </form>
    </div>
  )
}

InitForm.propTypes = {
  initForm: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  savedForm: PropTypes.bool,
  form: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  savedForm: state.page.saved,
  form: state.form.form,
  error: state.form.error
})

export default connect(mapStateToProps, { initForm, updateForm, clearForm })(
  InitForm
)
