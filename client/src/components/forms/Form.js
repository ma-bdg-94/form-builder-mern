/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

import { connect } from 'react-redux'
import { getForm } from '../../actions/form'

import Moment from 'react-moment'

import Text from './inputs/Text'
import Paragraph from './inputs/Paragraph'
import Numbr from './inputs/Numbr'
import Url from './inputs/Url'
import DateTime from './inputs/DateTime'
import Phone from './inputs/Phone'
import Checkbox from './inputs/Checkbox'
import Radio from './inputs/Radio'

const Form = ({ getForm, form: { form }, match }) => {
  useEffect(() => {
    getForm(match.params.id)
  }, [])

  return (
    <Fragment>
      <Card className='mx-5 my-5'>
        <CardBody>
          <CardTitle tag='h5'>
            {form && form.title} created by{' '}
            {form && form.admin && form.admin.fullName}
          </CardTitle>
          <CardSubtitle className='mb-2 text-muted' tag='h6'>
            created in{' '}
            <Moment format='MMMM Do YYYY, hh:mm a'>
              {form && form.createdAt}
            </Moment>
          </CardSubtitle>
        </CardBody>
      </Card>

      <div>
        {form.questions &&
          form.questions.map(q => {
            switch (q.questionType) {
              case 'text':
                return (
                  <div>
                    <Text key={q._id} form={form._id} label={q.questionDesc} />
                  </div>
                )
              case 'paragraph':
                return (
                  <div>
                    <Paragraph
                      key={q._id}
                      form={form._id}
                      label={q.questionDesc}
                    />
                  </div>
                )
              case 'number':
                return (
                  <div>
                    <Numbr key={q._id} form={form._id} label={q.questionDesc} />
                  </div>
                )
              case 'date-time':
                return (
                  <div>
                    <DateTime
                      key={q._id}
                      form={form._id}
                      label={q.questionDesc}
                    />
                  </div>
                )
              case 'phone':
                return (
                  <div>
                    <Phone key={q._id} form={form._id} label={q.questionDesc} />
                  </div>
                )
              case 'checkbox':
                return (
                  <div>
                    <Checkbox
                      key={q._id}
                      form={form._id}
                      label={q.questionDesc}
                    />
                  </div>
                )
              case 'radio':
                return (
                  <div>
                    <Radio key={q._id} form={form._id} label={q.questionDesc} />
                  </div>
                )
              case 'url':
                return (
                  <div>
                    <Url key={q._id} form={form._id} label={q.questionDesc} />
                  </div>
                )
              default:
                return null
            }
          })}
      </div>
    </Fragment>
  )
}

Form.propTypes = {
  getForm: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  form: state.form
})

export default connect(mapStateToProps, { getForm })(Form)
