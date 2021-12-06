/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// ---implement redux---
import { connect } from 'react-redux'
import { signOut } from '../actions/auth'

const Navigation = ({ isAuth, signOut }) => {
  const connectedNav = (
    <ul className='navbar-nav ms-auto mx-5'>
      <li className='nav-item'>
        <Link className='nav-link' to='/page_browser'>
          Browse Pages
        </Link>
      </li>
       <li className='nav-item'>
        <Link className='nav-link' to='/form_browser'>
          Browse Forms
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/my_pages'>
          My Pages
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/my_forms'>
          My Forms
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/new_page'>
          New Page
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/new_form'>
          New Form
        </Link>
      </li>
      <li className='nav-item'>
        <a className='nav-link' style={{ cursor: 'pointer' }} onClick={signOut}>
          Sign Out
        </a>
      </li>
    </ul>
  )

  const notConnectedNav = (
    <ul className='navbar-nav ms-auto mx-5'>
      <li className='nav-item'>
        <Link className='nav-link' to='/signup'>
          Sign Up
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Form Builder
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor01'>
          {
            isAuth ? connectedNav : notConnectedNav
          }
        </div>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { signOut })(Navigation)
