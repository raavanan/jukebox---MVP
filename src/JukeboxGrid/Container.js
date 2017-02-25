import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'

import * as types from './ActionTypes'
import image1 from './genreImages/105.jpg'

const wrapperStyle = css({
    width: '700px',
    padding: '0px',
    margin:'0px auto',
    '& .jukebox':{
        width:'350px',
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

    componentDidMount(){
        this.props.dispatch({type : types.GET_ALL_JUKEBOXES})
    }

    renderBoxes = () => {
         return this.props.jukeboxes.map(jb => {
                return (
                    <div key={jb.key} className='jukebox'>
                        <h1>{jb.name}</h1>
                        <img src={image1} alt='img'/>
                    </div>
                )
         })
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