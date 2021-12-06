import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Home = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to="/board" />
  }

  return (
    <div className="landing py-5 my-5">
      <h1>Welcome to Form Builder</h1>
      <h5>You can benefit of this service only you have account</h5>
      <div className="d-flex justify-content-center my-5">
      <Link to="login"><button type="button" className="btn btn-primary btn-lg mx-1">Login</button></Link>
      <Link to="signup"><button type="button" className="btn btn-outline-primary btn-lg mx-1">Sign Up</button></Link>
      </div>
    </div>
  )
}

Home.propTypes = {
  isAuth: PropTypes.bool,
}

const mapStateToPtops = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToPtops)(Home)
