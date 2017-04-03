import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'
import {withRouter} from 'react-router-dom'


/**================================================== *
 * ==========  File imports  ========== *
 * ================================================== */

import * as types from './ActionTypes'
import {LISTEN_JUKEBOX} from '../Player/ActionTypes'
import {MontserratBold} from '../Fonts'

/* =======  End of file Imports  ======= */



/**================================================== *
 * ==========  wrapperStyle object  ========== *
 * ================================================== */

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
                bottom: '15px',
                left: '40px',
                fontSize: '12px'
            },
            '& .genre': {
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

/* =======  End of wrapperStyle object  ======= */



class JukeboxGrid extends Component {

    /**
     *
     * @function componentDidMount
     * dispatch GET_ALL_JUKEBOXES on componentDidMount
     */
    componentDidMount(){
        this.props.dispatch({type : types.GET_ALL_JUKEBOXES})
    }

    /**
     *
     * @function listenTo
     * @param (object) box
     * dispatch action LISTEN_JUKEBOX
     * route to player with box Id
     */
    listenTo = (box) => {
        this.props.dispatch({type: LISTEN_JUKEBOX, box})
        this.props.history.push(`/player/${box.id}`)
    }

    /**
     *
     * @function renderBoxes
     * @return (JSX) retruns grid items
     *
     */
    renderBoxes = () => {
        return this.props.jukeboxes.map(box => {
            const listen = this.listenTo.bind(null, box)
            return (
                <div key={box.id} className='jukebox'>
                        <div className='info'>
                            <h1>{box.name}</h1>
                            <p className='genre'>{box.genre}</p>
                            <p className='listeners'>{box.listnerCount} Listners</p>
                            <button onClick={listen} type='button'>Listen</button>
                        </div>
                        <img src={`/genreImages/${box.img}`} alt='img'/>
                </div>
            )
        })
    }

    /* Render */

    render(){
        const renderBoxes = this.renderBoxes()
        return (
            <div {...wrapperStyle}>
                {renderBoxes}
            </div>
        )
    }
}

/**
 *
 * mapStateToProps
 * jukeboxes : array of jukeboxes
 */

function mapStateToProps(state) {
  return {
      jukeboxes : state.jukeboxes.boxes
  }
}



export default connect(mapStateToProps)(withRouter(JukeboxGrid))