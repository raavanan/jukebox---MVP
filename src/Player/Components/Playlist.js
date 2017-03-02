import React, {Component} from 'react'
import {css} from 'glamor'

class Playlist extends Component {

playlistWrapper = css({
    height:'100vh',
    width: '0%',
    position: 'absolute',
    top:0,
    right:'-200px',
    zIndex: 99,
    boxShadow: '0 20px 50px 0 rgba(0, 0, 0, 0.3)',
    background:'#F96332',
    color:'#FFFFFF',
    padding:'20px',
    transition:'width 0.4s ease'
})

    render(){

        return (
            <div {...this.playlistWrapper} style={{width: this.props.togglePlaylist ? '30%' : '0%', right: this.props.togglePlaylist ? '0' : '-200px'}} >
                <ul>
                    {this.props.playlist.map(item => (<li key={item.itemId}>{item.snippet.title}</li>))}
                </ul>
                <div className='controls'></div>
            </div>
        )
    }
}

export default Playlist