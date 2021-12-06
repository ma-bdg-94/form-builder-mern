import { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

// ---import components---
import ErrorBlock from '../ErrorBlock'

// ---implement redux---
import { connect } from 'react-redux'
import { createPage, updatePage, clearPage } from '../../actions/page'

const CreatePage = ({
  savedPage,
  error,
  updatePage,
  clearPage,
  createPage
}) => {
  const [formData, setFormData] = useState({
    title: savedPage ? savedPage.title : '',
    desc: savedPage ? savedPage.desc : ''
  })

  const { title, desc } = formData

  const handleChange = ev => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value
    })
  }

  const history = useHistory()
  const redirectTo = () => {
    let url = '/my_pages'
    history.push(url)
  }

  const handleSubmit = ev => {
    ev.preventDefault()

    if (savedPage) {
      updatePage(savedPage._id, formData)
      clearPage()
    } else {
      createPage({ title, desc })
      if (!error) redirectTo()
    }
  }

  return (
    <div className='landing py-5 my-5'>
      <h1 className='mb-4'>Create a new page</h1>
      <form className='mx-5 px-5'>
        <fieldset>
          <div className='form-group my-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Set a title for the page'
              name='title'
              value={title}
              onChange={ev => handleChange(ev)}
            />
          </div>
          <div className='form-group my-3'>
            <textarea
              type='text'
              className='form-control'
              placeholder='Say some details about the page'
              rows='4'
              name='desc'
              value={desc}
              onChange={ev => handleChange(ev)}
            />
          </div>
        </fieldset>
        <div>
          <button
            type='button'
            className='btn btn-primary btn-lg mx-1 my-2'
            onClick={ev => handleSubmit(ev)}
          >
            Create the page
          </button>
        </div>
        <ErrorBlock />
      </form>
    </div>
  )
}

CreatePage.propTypes = {
  createPage: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  clearPage: PropTypes.func.isRequired,
  savedPage: PropTypes.bool,
  page: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  savedPage: state.page.saved,
  page: state.page.page,
  error: state.page.error
})

export default connect(mapStateToProps, { createPage, updatePage, clearPage })(
  CreatePage
)
