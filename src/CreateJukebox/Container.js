import React, {Component} from 'react'
import {connect} from 'react-redux'

import Header from './Presenters/Header'
import CreateForm from './Presenters/CreateForm'

class CreateJukebox extends Component {

    render() {
        return (
            <div>
                <Header />
                <CreateForm />
            </div>
        )
    }
}

function mapStateToProps(state, props) {
  return {

  }
}

export default connect(mapStateToProps)(CreateJukebox)