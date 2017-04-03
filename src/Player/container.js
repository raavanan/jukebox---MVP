import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'
import {withRouter} from 'react-router-dom'

import Header from './Components/Header'
import PlayHead from './Components/PlayHead'
import Playlist from './Components/Playlist'
import AddVideo from './Components/AddVideo'
import * as types from './ActionTypes'
import {LEAVE_JUKEBOX, ENTER_JUKEBOX} from '../JukeboxGrid/ActionTypes'

class Player extends Component {
    state = {
        showAddVideo : false,
        showPlaylist : false
    }

    wrapper = css({
        width:'100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
    })

    toggleAddVideo = () => {
        this.setState({
            showAddVideo : !this.state.showAddVideo
        })
    }

    togglePlaylist = () => {
        this.setState({
            showPlaylist : !this.state.showPlaylist
        })
    }

    /**
     *
     * TODO : handle user closing window
     *
     */
    handleWindowClose = () => {
        alert('unload')
        this.props.dispatch({type: LEAVE_JUKEBOX, id : this.props.match.params.id})
    }

    leave = () => {
        this.props.history.push('/')
    }

    componentDidMount() {
        this.props.dispatch({type: types.GET_PLAYLIST, id: this.props.match.params.id})
        this.props.dispatch({type: ENTER_JUKEBOX, id: this.props.match.params.id})
        this.props.dispatch({type: types.SYNC_USERCOUNT})
    }

    componentWillUnmount(){
        this.props.dispatch({type: types.RESET_PLAYER})
        this.props.dispatch({type: LEAVE_JUKEBOX, id : this.props.match.params.id})
    }

    render(){
        const songCount = this.props.playlist.length
        return (
            <div {...this.wrapper}>
                <Header name={this.props.name} leave={this.leave} showPlaylist={this.togglePlaylist} addVideo={this.toggleAddVideo} songCount={songCount} togglePlaylist={this.state.showPlaylist} />
                <Playlist togglePlaylist={this.state.showPlaylist} playlist={this.props.playlist} />
                <PlayHead togglePlaylist={this.state.showPlaylist} />
                {this.state.showAddVideo && <AddVideo close={this.toggleAddVideo} />}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        currentVideo: state.player.currentVideo,
        playlistEmpty: state.player.playlistEmpty,
        playlist : state.player.playlist,
        name : state.player.name
    }
}

export default connect(mapStateToProps)(withRouter(Player))