/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'

import { connect } from 'react-redux'
import { getPage } from '../../actions/page'

import Moment from 'react-moment'

const Page = ({ getPage, page: { page }, match }) => {
  useEffect(() => {
    getPage(match.params.link)
  }, [])

  return (
    <Fragment>
      <Card className="mx-5 my-5">
        <CardBody>
          <CardTitle tag='h5'>{page && page.title} written by {page && page.admin && page.admin.fullName}</CardTitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            created in{' '}
            <Moment format='MMMM Do YYYY, hh:mm a'>{page && page.createdAt}</Moment>
          </CardSubtitle>
          <CardText>{page && page.desc}</CardText>
        </CardBody>
      </Card>
    </Fragment>
  )
}

Page.propTypes = {
  getPage: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  page: state.page,
})

export default connect(mapStateToProps, { getPage })(Page)
