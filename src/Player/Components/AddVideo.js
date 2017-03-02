import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'
import {GET_SEARCH_RESULTS, ADD_VIDEO} from '../ActionTypes'

class AddVideo extends Component {

    addVideoWrapper = css({
        background: 'rgba(255,255,255, 0.8)',
        color: '#444',
        width:'100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left:0,
        zIndex: 999,
        '& .closeBtn' : {
            position:'absolute',
            top:'20px',
            right: '50px',
            width: '50px',
            height: '50px',
            fontSize: '50px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            '&:focus': {
                outline: 'none'
            }
        },
        '& .search-input': {
            position: 'absolute',
            top: '100px',
            left:0,
            right: 0,
            margin: '20px auto',
            width:'80%',
            height: '150px',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            background:'none',
            fontSize: '140px',
            color: '#555',
            borderBottom: '2px solid #333',
            '&:focus': {
                outline: 'none'
            },
            '&::-webkit-input-placeholder': {
                color: '#555',
                fontStyle: 'italic',
                opacity:0.3,
            }
        },
        '& .results': {
            width: '100%',
            height: '350px',
            position: 'absolute',
            bottom: '0px',
            cursor: 'pointer',
            '& .result': {
                width: '30%',
                height: '200px',
                float: 'left',
                margin: 'auto',
                '& img': {
                    width:'100px',
                    height: '100px',
                    margin: '10px',
                    float: 'left',
                },
                '& h3': {
                    fontSize: '12px',
                    margin: '10px'
                },
                '& p': {
                    fontSize: '8px',
                    color: '#777',
                    height:'50px',
                    overflow: 'hidden'
                }
            }
        }
    })

    componentDidMount(){
        this.refs.searchInput.focus()
    }

    addVideo = (video) => {
        const params = {video, searchResults : []}
        if(this.props.playlistEmpty){
            params.currentVideo = video
        }
        this.props.dispatch({type: ADD_VIDEO, params})
        this.props.close()
    }

    search = () => {
        this.props.dispatch({type:GET_SEARCH_RESULTS, q:this.refs.searchInput.value})
    }

    renderResults = (result) => {
        return (
             <div key={result.id.videoId} onClick={this.addVideo.bind(null, result)} className='result'>
                <img src={result.snippet.thumbnails.default.url} alt='result'/>
                <h3>{result.snippet.title}</h3>
                <p>{result.snippet.description}</p>
            </div>
        )

    }

    render() {
        return (
            <div {...this.addVideoWrapper}>
                <button className='closeBtn' onClick={this.props.close}>x</button>
                <div className='search'>
                    <input type='text' className='search-input' ref='searchInput' placeholder='search youtube' onChange={this.search} />
                    <div className='results'>
                        {this.props.searchResults.map(this.renderResults)}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        searchResults: state.player.searchResults,
        playlistEmpty : state.player.playlistEmpty
    }
}

export default connect(mapStateToProps)(AddVideo)
