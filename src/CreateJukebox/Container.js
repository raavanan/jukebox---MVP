import React, {Component} from 'react'
import {connect} from 'react-redux'

import Header from './Presenters/Header'
import CreateForm from './Presenters/CreateForm'
import {Auth} from '../Firebase'
import {REQUEST_CREATE_JUKEBOX} from './ActionTypes'
import {slugify, getRandomNumber} from '../global'

class CreateJukebox extends Component {

    logout = () => {
        location.href = '/login'
        return Auth().signOut()
    }

    createJukebox = () => {
        const name = document.getElementById('jukeboxName'),
        genre = document.getElementById('jukeboxGenre'),
        {uid, displayName, photoURL} = this.props.user

        if(name.value !== '' && genre.value !== ''){
            const jukeboxData = {
                genre : genre.value,
                name : name.value,
                slug : slugify(name.value),
                img : `${getRandomNumber(101, 120)}.jpg`,
                creator : {uid, displayName, photoURL}
            }
            this.props.dispatch({type : REQUEST_CREATE_JUKEBOX, jukeboxData})
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
      user : state.login.user

  }
}

export default connect(mapStateToProps)(CreateJukebox)