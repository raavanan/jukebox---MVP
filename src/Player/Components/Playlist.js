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
    padding:'10px',
    transition:'width 0.4s ease',
    '& ul':{
        listStyle: 'none',
        padding: '0px',
        '& li': {
            position: 'relative',
            width:'100%',
            textAlign: 'left',
            height: '100px',
            background: 'none',
            '& .video-img' : {
                position:'absolute',
                top: '13px',
                left:'10px',
                width:'70px',
                height: '70px',
                margin:'5px',
                zIndex: 2
            },
            '& .video-title' : {
                position:'absolute',
                top: '20px',
                left:'95px',
                fontSize: '14px',
                width:'200px',
                overflow:'hidden',
                height: '38px',
                zIndex: 2
            },
            '& .addedBy' : {
                position:'absolute',
                bottom: '5px',
                right:'10px',
                width: '150px',
                height: '30px',
                '& img': {
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    float:'left',
                    margin: '0px 5px'
                },
                '& span': {
                    float: 'left',
                    fontSize: '10px',
                    marginTop: '10px'
                }

            }
            }

        }
})

    render(){

        return (
            <div {...this.playlistWrapper} style={{width: this.props.togglePlaylist ? '30%' : '0%', right: this.props.togglePlaylist ? '0' : '-200px'}} >
                <ul>
                    {this.props.playlist.map(item => (
                        <li key={item.itemId} >
                            <img className='video-img' src={item.snippet.thumbnails.high.url} alt={item.addedBy.displayName}/>
                            <span className='video-title'>{item.snippet.title}</span>
                            <div className='addedBy'>
                                <img src={item.addedBy.photoURL} alt='cover' />
                                <span>{item.addedBy.displayName}</span>
                            </div>
                        </li>

                        ))}
                </ul>
                <div className='controls'></div>
            </div>
        )
    }
}

export default Playlist