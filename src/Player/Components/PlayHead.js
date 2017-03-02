import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'
import Youtube from 'react-youtube'

import {MontserratBold} from '../../Fonts'
import * as types from '../ActionTypes'

class PlayHead extends Component {

    state = {
        player: '',
        currentSongDuration: 0
    }

    /* styles */
playHeadWrapper = css({
    width: '100%',
    height: 'calc(100vh - 60px)',
    position: 'absolute',
    background: '#ec5e2f',
    color: '#ffffff',
    textAlign: 'center',
    transition:'width 0.4s ease',
    '& h1': {
        fontSize:'22px',
        fontFamily:MontserratBold
    },
    '& .playHead': {
        width: '100%',
        height: '450px',
        marginTop: '70px',
        position: 'relative',
        '& iframe': {
                border: 'none'
        },
        '& .now':{
            boxShadow: '0 20px 50px 0 rgba(0, 0, 0, 0.3)',
            width: '45%',
            height: '350px',
            position: 'absolute',
            left: '0px',
            right: '0px',
            margin: '0px auto',
            zIndex: 3
        },
        '& .prev, .next': {
            width: '30%',
            height: '270px',
            position: 'absolute',
            right: '0px',
            top: '45px',
            zIndex: 1,
            cursor: 'pointer',
            '& span': {
                fontSize: '102px',
                fontFamily: MontserratBold,
                position: 'absolute',
                top: '10px',
                opacity: 0.5,
                margin:'0px auto',
                left: 0,
                right: 0,
                zIndex:3
            },
            '& h1': {
                fontSize: '144px',
                fontFamily: MontserratBold,
                position: 'absolute',
                bottom: '-34px',
                opacity: 0.3,
                margin:'0px auto',
                left: 0,
                right: 0,
                zIndex:3
            },
            '& .overlay':{
                position:'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                left: 0,
                background: 'rgba(0,0,0,0.4)',
                zIndex:2
            },
            '& img': {
                width: '100%',
                height: '100%',
                opacity: 1
            }
        },
        '& .prev': {
            left:'0px'
        }
    }

})


    onReady = (event) => {
        this.setState({
            player: event.target
        })
        this.validate()
    }

    onEnd = () => {
        const video = this.props.currentVideo
        this.props.dispatch({type: types.VIDEO_ENDED, video})
    }

    onPlay = (event) => {

        const duration = this.state.player.getDuration()/60

        this.setState({
            currentSongDuration : duration
        })
        this.validate()

    }

    validate = () => {
        if(this.state.currentSongDuration > 8){
            alert('this song is too long')
            this.onEnd()
        }
    }

    getRandomImage = () => {
        const number = Math.floor(Math.random() * (120 - 101 + 1)) + 101

        return number
    }

    opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls:0,
        modestBranding:1
      }
    }

    render () {

        const videoId = this.props.currentVideo !== '' ? this.props.currentVideo.id.videoId : '',
        videoTitle = this.props.currentVideo !== '' ? this.props.currentVideo.snippet.title : 'Add a song'

        return (
            <div {...this.playHeadWrapper} style={{width: this.props.togglePlaylist ? '70%' : '100%'}}>
                    <h1>{videoTitle}</h1>
                    <div className='playHead'>
                        <div className='prev'>
                            <div className='overlay'></div>
                            <span>1</span>
                            <h1>PrV</h1>
                            <img src={`/playerImg/prv.jpg`} alt='img'/>
                        </div>
                        <div className='now'>
                            <Youtube videoId={videoId} opts={this.opts} onEnd={this.onEnd} onReady={this.onReady} onPlay={this.onPlay} />
                        </div>
                        <div onClick={this.onEnd} className='next'>
                            <div className='overlay'></div>
                            <span>2</span>
                            <h1>NxT</h1>
                            <img src={`/playerImg/nxt.jpg`} alt='img'/>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentVideo : state.player.currentVideo,
        isEmpty : state.player.playlistEmpty
    }
}

export default connect(mapStateToProps)(PlayHead)

