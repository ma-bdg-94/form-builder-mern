// THIS DOES NOT WORK WITH REACT-ROUTER-DOM V6

import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Private = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth.isAuth ? (<Redirect to='/login' />) : (<Component {...props} />)
    }
  />
)

Private.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Private)
