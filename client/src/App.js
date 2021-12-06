import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// ---implement redux---
import { Provider } from 'react-redux'
import store from './store/store'
import { getUser } from './actions/auth'

// ---import components---
import Navigation from './components/Navigation'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Board from './components/Board'
import AllPages from './components/pages/AllPages'
import MyPages from './components/pages/MyPages'
import CreatePage from './components/pages/CreatePage'
import InitForm from './components/forms/InitForm'
import CreateForm from './components/forms/CreateForm'
import AllForms from './components/forms/AllForms'
import MyForms from './components/forms/MyForms'
import Page from './components/pages/Page'
import Form from './components/forms/Form'
import Private from './components/routing/Private'

// ---set authentication token in the local storage---
import setToken from './utilities/setToken'
if (localStorage.token) {
  setToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(getUser());
  }, [])

  return (
    
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Private exact path='/board' component={Board} />
            <Private exact path='/page_browser' component={AllPages} />
            <Private exact path='/my_pages' component={MyPages} />
            <Private exact path='/new_page' component={CreatePage} />
            <Private exact path='/pages/:link' component={Page} />
            <Private exact path='/new_form' component={InitForm} />
            <Private exact path='/build_form' component={CreateForm} />
            <Private exact path='/form_browser' component={AllForms} />
            <Private exact path='/my_forms' component={MyForms} />
            <Private exact path='/forms/:id' component={Form} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
