import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPage, removePage, savePage } from '../../actions/page'
import Moment from 'react-moment'
import {
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Card
} from 'reactstrap'

const PageItem = ({ removePage, savePage, page, getPage }) => {
  return (
    <Card className='mx-5 my-5'>
      <CardBody>
        <Link to={`/pages/${page.link}`} onClick={() => getPage(page.link)}>
          <CardTitle tag='h5'>{page && page.title}</CardTitle>
        </Link>
        <CardSubtitle className='mb-2 text-muted' tag='h6'>
          <Moment format='DD/MM/YYYY'>{page && page.createdAt}</Moment>
        </CardSubtitle>
        <CardText>{page && page.desc}</CardText>
        <Button
          className='mx-2'
          color='danger'
          outline
          onClick={ev => removePage(page._id)}
        >
          Remove
        </Button>
        <Link to='/new_page'>
          <Button
            className='mx-2'
            color='info'
            outline
            onClick={ev => savePage(page)}
          >
            Update
          </Button>
        </Link>
      </CardBody>
    </Card>
  )
}

PageItem.propTypes = {
  page: PropTypes.object.isRequired,
  removePage: PropTypes.func.isRequired,
  savePage: PropTypes.func.isRequired
}

export default connect(null, { removePage, savePage, getPage })(PageItem)
