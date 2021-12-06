import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMyPages } from '../../actions/page'
import PageItem from './PageItem'

const MyPages = ({ auth: { isAuth, user }, pages, getMyPages }) => {
  useEffect(() => {
    getMyPages()
  }, [getMyPages])

  return (
    <Fragment>
      <h1>Created Pages By: {user && user.fullName}</h1>
      <div>
        {pages.map(page => (
          <PageItem key={page._id} page={page} />
        ))}
      </div>
    </Fragment>
  )
}

MyPages.propTypes = {
  getMyPages: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  pages: state.page.pages,
  auth: state.auth
})

export default connect(mapStateToProps, { getMyPages })(MyPages)
