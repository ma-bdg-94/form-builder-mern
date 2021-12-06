import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getForms } from '../../actions/form'

const AllForms = ({ forms, getForms }) => {
  useEffect(() => {
    getForms()
  }, [getForms])

  return (
    <Fragment>
      <h1>All Created Forms:</h1>
      <div>
        {forms && forms.map(form => (
          <div className='my-4'>
            <Link to={`/forms/${form._id}`}>
              <h5>{form.title}</h5>
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

AllForms.propTypes = {
  getForms: PropTypes.func.isRequired,
  forms: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  forms: state.form.forms
})

export default connect(mapStateToProps, { getForms })(AllForms)
