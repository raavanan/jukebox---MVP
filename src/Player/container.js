import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'
import {withRouter} from 'react-router-dom'

import Header from './Components/Header'
import PlayHead from './Components/PlayHead'
import Playlist from './Components/Playlist'
import AddVideo from './Components/AddVideo'
import * as types from './ActionTypes'

class Player extends Component {
    state = {
        showAddVideo : false,
        showPlaylist : true
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

    componentDidMount() {
        this.props.dispatch({type: types.GET_PLAYLIST, id: this.props.match.params.id})
    }

    componentWillUnmount(){
        this.props.dispatch({type: types.RESET_PLAYER})
    }

    render(){
        return (
            <div {...this.wrapper}>
                <Header showPlaylist={this.togglePlaylist} addVideo={this.toggleAddVideo} togglePlaylist={this.state.showPlaylist} />
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
        playlist : state.player.playlist
    }
}

export default connect(mapStateToProps)(withRouter(Player))