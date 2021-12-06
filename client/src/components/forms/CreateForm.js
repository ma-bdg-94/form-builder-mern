import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

// import PageItem from '../pages/PageItem'

import Text from './inputs/Text'
import Paragraph from './inputs/Paragraph'
import Numbr from './inputs/Numbr'
import Url from './inputs/Url'
import DateTime from './inputs/DateTime'
import Phone from './inputs/Phone'
import Checkbox from './inputs/Checkbox'
import Radio from './inputs/Radio'

import { connect } from 'react-redux'
import { addQuestion, removeQuestion, assignPage } from '../../actions/form'
import { getMyPages } from '../../actions/page'

const CreateForm = ({
  auth: { user },
  form,
  page: { pages },
  addQuestion,
  removeQuestion,
  getMyPages,
  assignPage
}) => {
  useEffect(() => {
    getMyPages()
  }, [getMyPages])

  const [showQuestForm, setShowQuestForm] = useState(false)
  const [showPageList, setShowPageList] = useState(false)

  const [questFormData, setQuestFormData] = useState({
    questionDesc: '',
    questionType: ''
  })

  const { questionDesc, questionType } = questFormData

  const handleChange = ev => {
    setQuestFormData({
      ...questFormData,
      [ev.target.name]: ev.target.value
    })
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    addQuestion({ questionDesc, questionType }, form._id)
    setShowQuestForm(!showQuestForm)
    setQuestFormData({
      questionDesc: '',
      questionType: ''
    })
  }

  return (
    <div className='py-3'>
      <h2 className='text-center my-3'>{form && form.title}</h2>
      <Button
        color='primary'
        className='text-center my-3 mx-5'
        style={{ width: '50%' }}
        onClick={() => setShowQuestForm(!showQuestForm)}
      >
        Add Question
      </Button>

      {showQuestForm && (
        <div className='text-left my-3 mx-5'>
          <h6>What is about?</h6>
          <input
            type='text'
            name='questionDesc'
            value={questionDesc}
            style={{ width: '50%' }}
            className='mt-1'
            onChange={ev => handleChange(ev)}
          />
          <br />
          <select
            name='questionType'
            value={questionType}
            id='questionType-select'
            className='my-2'
            onChange={ev => handleChange(ev)}
          >
            <option value=''>--Please choose a question type--</option>
            <option value='text'>Short Text</option>
            <option value='paragraph'>Paragraph</option>
            <option value='number'>Number</option>
            <option value='checkbox'>Checkbox</option>
            <option value='date-time'>Date / Time Picker</option>
            <option value='radio'>Redio Button</option>
            <option value='phone'>Phone Number</option>
            <option value='url'>URL Address</option>
          </select>
          <br />
          <Button color='info' outline onClick={ev => handleSubmit(ev)}>
            Insert Question
          </Button>
        </div>
      )}

      <div>
        {form.questions &&
          form.questions.map(q => {
            switch (q.questionType) {
              case 'text':
                return (
                  <div>
                    <Text key={q._id} form={form._id} label={q.questionDesc} />
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
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
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
                  </div>
                )
              case 'number':
                return (
                  <div>
                    <Numbr key={q._id} form={form._id} label={q.questionDesc} />
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
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
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
                  </div>
                )
              case 'phone':
                return (
                  <div>
                    <Phone key={q._id} form={form._id} label={q.questionDesc} />
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
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
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
                  </div>
                )
              case 'radio':
                return (
                  <div>
                    <Radio key={q._id} form={form._id} label={q.questionDesc} />
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
                  </div>
                )
              case 'url':
                return (
                  <div>
                    <Url key={q._id} form={form._id} label={q.questionDesc} />
                    {user && form && form.admin !== user.id ? (
                      <Button
                        color='danger'
                        outline
                        className='text-center mx-5'
                        style={{ border: 'none' }}
                        onClick={ev => removeQuestion(form._id, q._id)}
                      >
                        Dismiss
                      </Button>
                    ) : null}
                  </div>
                )
              default:
                return null
            }
          })}
      </div>

      {form && form.questions.length > 0 && (
        <div>
          <Button onClick={() => setShowPageList(!showPageList)}>
            Assign this form to a page
          </Button>

          {showPageList && (
            <div>
              {pages &&
                pages.map(page => (
                  <Button onClick={() => assignPage(form.id, page._id)}>
                    {page.title}
                  </Button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

CreateForm.propTypes = {
  form: PropTypes.object.isRequired,
  addQuestion: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  getMyPages: PropTypes.func.isRequired,
  assignPage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  form: state.form.form,
  auth: state.auth,
  page: state.page
})

export default connect(mapStateToProps, {
  addQuestion,
  removeQuestion,
  getMyPages,
  assignPage
})(CreateForm)
