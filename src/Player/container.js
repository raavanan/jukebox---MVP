import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'

import Header from './Components/Header'
import PlayHead from './Components/PlayHead'
import Playlist from './Components/Playlist'
import AddVideo from './Components/AddVideo'

class Player extends Component {
    state = {
        showAddVideo : true
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

    render(){
        return (
            <div {...this.wrapper}>
                <Header addVideo={this.toggleAddVideo} />
                <Playlist />
                <PlayHead currentVideo={this.props.currentVideo} />
                {this.state.showAddVideo && <AddVideo close={this.toggleAddVideo} />}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        currentVideo: state.player.currentVideo
    }
}

export default connect(mapStateToProps)(Player)