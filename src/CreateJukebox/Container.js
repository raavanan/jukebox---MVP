import React, {Component} from 'react'
import {connect} from 'react-redux'


/*--------  File imports  --------*/

import Header from './Presenters/Header'
import CreateForm from './Presenters/CreateForm'
import {Auth} from '../Firebase'
import {REQUEST_CREATE_JUKEBOX} from './ActionTypes'
import {slugify, getRandomNumber} from '../global'


/*--------  File import End  --------*/

class CreateJukebox extends Component {

    /**
     *
     * @function logout
     * sign out logged in user
     *
     */
    logout = () => {
        location.href = '/login'
        return Auth().signOut()
    }

    /**
     *
     * @function createJukebox
     * gets the values entered by the user and 
     * constructs jukeboxData object and dispatches Request to create a new jukebox
     *
     */
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
                creator : {uid, displayName, photoURL},
                listnerCount : 0
            }
            this.props.dispatch({type : REQUEST_CREATE_JUKEBOX, jukeboxData})
            name.value = ''
            genre.value = ''
        }
    }

    /**

        TODO:
        - Add back button on header
        - Add profile Options in Header

     */
    render() {
        return (
            <div>
                <Header logout={this.logout} />
                <CreateForm createJukebox={this.createJukebox} />
            </div>
        )
    }
}

/**
 *
 * mapStateToProps
 * user : loggedin user object
 *
 */
function mapStateToProps(state, props) {
  return {
      user : state.login.user

  }
}

export default connect(mapStateToProps)(CreateJukebox)