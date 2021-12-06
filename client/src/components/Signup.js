import { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// ---import components---
import ErrorBlock from './ErrorBlock'

// ---implement redux---
import { connect } from 'react-redux'
import { signUp } from '../actions/auth'

const Signup = ({ signUp,isAuth }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    job: '',
    username: '',
    pin: ''
  })

  const { fullName, job, username, pin } = formData

  const handleChange = ev => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value
    })
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    signUp({ fullName, job, username, pin })
  }

  // ---redirect to user board once signed up---
  if (isAuth) {
    return (
      <Redirect to="/board" />
    )
  }

  return (
    <div className='landing py-5 my-5'>
      <h1 className='mb-4'>Create a free account now</h1>
      <form className='mx-5 px-5'>
        <fieldset>
          <div className='form-group my-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Full Name'
              name='fullName'
              value={fullName}
              onChange={ev => handleChange(ev)}
            />
          </div>
          <div className='form-group my-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Job Title'
              name='job'
              value={job}
              onChange={ev => handleChange(ev)}
            />
          </div>
          <div className='form-group my-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Username'
              name='username'
              value={username}
              onChange={ev => handleChange(ev)}
            />
          </div>
          <div className='form-group my-3'>
            <input
              type='password'
              className='form-control'
              placeholder='PIN Code (only 4 digits)'
              name='pin'
              value={pin}
              onChange={ev => handleChange(ev)}
            />
          </div>
        </fieldset>
        <button
          type='button'
          className='btn btn-primary btn-lg mx-1 my-2'
          onClick={ev => handleSubmit(ev)}
        >
          Create an account
        </button>
        <ErrorBlock />
      </form>
    </div>
  )
}

Signup.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { signUp })(Signup)
