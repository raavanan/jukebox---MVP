import React, {Component} from 'react'
import {css} from 'glamor'
import image1 from './genreImages/105.jpg'
import image2 from './genreImages/102.jpg'
import image3 from './genreImages/107.jpg'
import image4 from './genreImages/111.jpg'

const wrapperStyle = css({
    width: '100hw',
    height:'100vw',
    padding: '0px',
    margin:'0px',
    '& .jukebox':{
        width:'50%',
        height: '350px',
        float:'left',
        background:'#999',
        overflow:'hidden',
        position: 'relative',
        '& img': {
            height: '100%',
            position: 'absolute',
            zIndex: 1
        }
    }
})

class JukeboxGrid extends Component {

    render(){
        return (
            <div {...wrapperStyle}>
                <div className='jukebox'>
                    <img src={image1}/>
                </div>
                <div className='jukebox'>
                    <img src={image2}/>
                </div>
                <div className='jukebox'>
                    <img src={image3}/>
                </div>
                <div className='jukebox'>
                    <img src={image4}/>
                </div>
            </div>
        )
    }
}

export default JukeboxGrid