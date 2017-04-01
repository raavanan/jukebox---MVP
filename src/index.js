import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import {css} from 'glamor'

import App from './App'
import { MontserratRegular } from './Fonts'

css.global(
    'html, body',
    { padding: 0,
      background: '#ec5e2f',
      margin: 0,
      boxSizing: 'border-box',
      fontFamily: MontserratRegular
  })


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);