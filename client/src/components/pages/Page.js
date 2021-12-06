/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'

import { connect } from 'react-redux'
import { getPage } from '../../actions/page'
import { getForms } from '../../actions/form'

import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const Page = ({ getPage, getForms, page: { page }, forms, match }) => {
  useEffect(() => {
    getPage(match.params.link)
    getForms()
  }, [])

  return (
    <Fragment>
      <Card className='mx-5 my-5'>
        <CardBody>
          <CardTitle tag='h5'>
            {page && page.title} written by{' '}
            {page && page.admin && page.admin.fullName}
          </CardTitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            created in{' '}
            <Moment format='MMMM Do YYYY, hh:mm a'>
              {page && page.createdAt}
            </Moment>
          </CardSubtitle>
          <CardText>{page && page.desc}</CardText>
        </CardBody>
      </Card>

      <Card className='mx-5 my-5'>
        <CardBody>
          <CardTitle tag='h5'>Related Forms:</CardTitle>
          <CardText>
            {
              forms && forms.map(form => {
                return form.pages.includes(page._id) && (
                  <h6>{form.title}</h6>
                )
              })
            }
          </CardText>
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
  forms: state.form.forms
})

export default connect(mapStateToProps, { getPage, getForms })(Page)
