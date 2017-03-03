import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'
import {withRouter} from 'react-router-dom'

import * as types from './ActionTypes'
import {LISTEN_JUKEBOX} from '../Player/ActionTypes'
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
                },
                '& a':{
                    textDecoration: 'none',
                    color: '#eb5322'
                }
            }
        }
    }
})

class JukeboxGrid extends Component {

    componentDidMount(){
        this.props.dispatch({type : types.GET_ALL_JUKEBOXES})
    }

    listenTo = (box) => {
        this.props.dispatch({type: LISTEN_JUKEBOX, box})
        this.props.push(`/player/${box.id}`)
    }

    renderBoxes = () => {
        return this.props.jukeboxes.map(box => {
            const listen = this.listenTo.bind(null, box)
            return (
                <div key={box.id} className='jukebox'>
                        <div className='info'>
                            <h1>{box.name}</h1>
                            <p className='listeners'>{box.genre}</p>
                            <button onClick={listen} type='button'>Listen</button>
                        </div>
                        <img src={`/genreImages/${box.img}`} alt='img'/>
                </div>
            )
        })
    }

    render(){
        const renderBoxes = this.renderBoxes()
        return (
            <div {...wrapperStyle}>
                {renderBoxes}
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
      jukeboxes : state.jukeboxes.boxes
  }
}



export default connect(mapStateToProps)(withRouter(JukeboxGrid))