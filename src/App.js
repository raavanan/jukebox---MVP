import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import {connect} from 'react-redux'

import Player from './Player/container'
import Login from './Login/Container'
import Home from './Home'
import { Auth } from './Firebase'
import {SET_USER} from './Login/ActionTypes'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}
class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = Auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })

        this.props.dispatch({type: SET_USER, user})

      } else {
        this.setState({
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
              <Switch>
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PrivateRoute authed={this.state.authed} exact path='/' component={Home} />
                <PrivateRoute authed={this.state.authed} path='/player/:id' component={Player} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps)(App)


