import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMyForms } from '../../actions/form'
import FormItem from './FormItem'

const MyForms = ({ auth: { user }, forms, getMyForms }) => {
  useEffect(() => {
    getMyForms()
  }, [getMyForms])

  return (
    <Fragment>
      <h1>Created Forms By: {user && user.fullName}</h1>
      <div>
        {forms.map(form => (
          <FormItem key={form._id} form={form} />
        ))}
      </div>
    </Fragment>
  )
}

MyForms.propTypes = {
  getMyForms: PropTypes.func.isRequired,
  forms: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  forms: state.form.forms,
  auth: state.auth
})

export default connect(mapStateToProps, { getMyForms })(MyForms)
