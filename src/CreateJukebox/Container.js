import React, {Component} from 'react'
import {connect} from 'react-redux'

import Header from './Presenters/Header'
import CreateForm from './Presenters/CreateForm'
import {Auth} from '../Firebase'
import {REQUEST_CREATE_JUKEBOX} from './ActionTypes'

class CreateJukebox extends Component {

    logout = () => {
        location.href = '/login'
        return Auth().signOut()
    }

    createJukebox = () => {
        const name = document.getElementById('jukeboxName'),
        genre = document.getElementById('jukeboxGenre')
        if(name.value !== '' && genre.value !== ''){
            const params = {
                name : name.value,
                genre : genre.value
            }
            this.props.dispatch({type : REQUEST_CREATE_JUKEBOX, params})
        }
    }

    render() {
        return (
            <div>
                <Header logout={this.logout} />
                <CreateForm createJukebox={this.createJukebox} />
            </div>
        )
    }
}

function mapStateToProps(state, props) {
  return {

  }
}

export default connect(mapStateToProps)(CreateJukebox)