import React, {Component} from 'react'
import {css} from 'glamor'
import Youtube from 'react-youtube'

import {MontserratBold} from '../../Fonts'

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
        console.log('ready')
        this.setState({
            player: event.target,
            currentSongDuration: (event.target.getDuration()/60)
        })
        this.validate()
    }

    validate = () => {
        if(this.state.currentSongDuration > 8){
            alert('this song is too long')
            let url = "https://www.youtube.com/watch?v=iw-m5fkwNWU"
            const videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            alert(videoid[1])
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
            <div {...this.playHeadWrapper}>
                    <h1>{videoTitle}</h1>
                    <div className='playHead'>
                        <div className='prev'>
                            <div className='overlay'></div>
                            <span>1</span>
                            <h1>PrV</h1>
                            <img src={`/playerImg/prv.jpg`} alt='img'/>
                        </div>
                        <div className='now'>
                            <Youtube videoId={videoId} opts={this.opts} onReady={this.onReady} />
                        </div>
                        <div className='next'>
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

export default PlayHead

