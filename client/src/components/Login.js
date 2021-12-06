import { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// ---import components---
import ErrorBlock from './ErrorBlock'

// ---implement redux---
import { connect } from 'react-redux'
import { login } from '../actions/auth'

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    username: '',
    pin: ''
  })

  const { username, pin } = formData

  const handleChange = ev => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value
    })
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    login({ username, pin })
  }

  // ---redirect to user board once logged in---
  if (isAuth) {
    return (
      <Redirect to="/board" />
    )
  }

  return (
    <div className='landing py-5 my-5'>
      <h1 className='mb-4'>Log into your account</h1>
      <form className='mx-5 px-5'>
        <fieldset>
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
          Log In
        </button>
        <ErrorBlock />
      </form>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)
