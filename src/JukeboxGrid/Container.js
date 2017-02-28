import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {css} from 'glamor'

import * as types from './ActionTypes'
import {MontserratBold} from '../Fonts'

const wrapperStyle = css({
    width: '100%',
    padding: '0px',
    margin:'0px auto',
    '& .jukebox':{
        width:'50%',
        height: '350px',
        float:'left',
        background:'#999',
        overflow:'hidden',
        position: 'relative',
        '& img': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1
        },
        '& .info' : {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            background:'rgba(0,0,0,0.2)',
            color: '#ffffff',
            '& h1' : {
                position: 'absolute',
                bottom: '72px',
                margin: '0px',
                left: '40px',
                fontSize: '36px',
                fontFamily: MontserratBold
            },
            '& .listeners': {
                position: 'absolute',
                bottom: '33px',
                left: '40px',
                fontSize: '12px'
            },
            '& button': {
                background: '#ffffff',
                width: '100px',
                height: '26px',
                borderRadius: '50px',
                border: 'none',
                color: '#eb5322',
                outline: 'none',
                fontFamily: MontserratBold,
                position: 'absolute',
                bottom: '72px',
                right: '40px',
                '&:active': {
                    background: '#eb5322',
                    color: '#ffffff'
                }
            }
        }
    }
})

class JukeboxGrid extends Component {

    componentDidMount(){
        this.props.dispatch({type : types.GET_ALL_JUKEBOXES})
    }

    getRandomImage = () => {
        const number = Math.floor(Math.random() * (120 - 101 + 1)) + 101

        return number
    }

    renderBoxes = () => {
        const jb = this.props.jukeboxes
        const boxes = []
        for(let key in jb){
            if(jb.hasOwnProperty(key)) {
                const box = jb[key]
                boxes.push(<div key={box.key} className='jukebox'>
                        <div className='info'>
                            <h1>{box.name}</h1>
                            <p className='listeners'>13 listening</p>
                            <button type='button'><Link to={`/player/${box.slug}`}>Listen</Link></button>
                        </div>
                        <img src={`/genreImages/${this.getRandomImage()}.jpg`} alt='img'/>
                </div>
                )
            }
        }
        return boxes
    }

    render(){
        return (
            <div {...wrapperStyle}>
                {this.renderBoxes()}
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
      jukeboxes : state.jukeboxes.jukeboxes
  }
}



export default connect(mapStateToProps)(JukeboxGrid)