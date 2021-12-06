import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../actions/auth'
import { getMyPages } from '../actions/page'

const Board = ({ auth: { user }, pages, getUser }) => {
  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getMyPages()
  }, [getMyPages])

  return (
    <div>
      <h1>{ user && user.fullName } @{user && user.username}</h1>
      <h3>{user && user.job}</h3>
      <h6>Created {pages && pages.length} pages</h6>
    </div>
  )
}

Board.propTypes = {

}

const mapStateToProps = state => ({
  auth: state.auth,
  pages: state.page.pages
})

export default connect(mapStateToProps, { getUser, getMyPages })(Board)
