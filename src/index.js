import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import {css} from 'glamor'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './App'
import Player from './Player/container'
import { MontserratRegular } from './Fonts'

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

css.global('html, body', { padding: 0, margin: 0, boxSizing: 'border-box', fontFamily: MontserratRegular })

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/player' component={Player} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);