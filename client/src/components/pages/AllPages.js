import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPages } from '../../actions/page'

const AllPages = ({ pages, getPages }) => {
  useEffect(() => {
    getPages()
  }, [getPages])

  return (
    <Fragment>
      <h1>All Created Pages:</h1>
      <div>
        {pages.map(page => (
          <div className='my-4'>
            <Link to={`/pages/${page.link}`}>
              <h5>{page.title}</h5>
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

AllPages.propTypes = {
  getPages: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  pages: state.page.pages
})

export default connect(mapStateToProps, { getPages })(AllPages)
