import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import createStore from './store'
import {css} from 'glamor'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './App'
import { MontserratRegular } from './Fonts'

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

css.global('html, body', { padding: 0, margin: 0, boxSizing: 'border-box', fontFamily: MontserratRegular })

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);