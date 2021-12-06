import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'
import { connect } from 'react-redux'

const ErrorBlock = ({ errors }) =>
  errors !== null &&
  errors.length > 0 &&
  errors.map(er => (
    <Alert color='danger' toggle={function noRefCheck () {}} key={er.id}>
      {er.msg}
    </Alert>
  ))

ErrorBlock.propTypes = {
  errors: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  errors: state.error
})

export default connect(mapStateToProps)(ErrorBlock)
