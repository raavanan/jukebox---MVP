import React, {Component} from 'react'
import {css} from 'glamor'

import Header from './Components/Header'
import PlayHead from './Components/PlayHead'
import Playlist from './Components/Playlist'

class Player extends Component {
    wrapper = css({
        width:'100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
    })

    render(){
        return (
            <div {...this.wrapper}>
                <Header />
                <Playlist />
                <PlayHead />
            </div>
        )
    }
}

export default Player