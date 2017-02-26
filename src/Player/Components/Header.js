import React from 'react'
import {css} from 'glamor'

import {MontserratBold} from '../../Fonts'

/* styles */

let headerStyle = css({
    width:'100%',
    position:'relative',
    transition:'width 0.4s ease'
})

let logoStyle = css({
    color: 'white',
    fontSize: '18px',
    margin:'0px auto',
    position:'absolute',
    left:0,
    right:0
})

let navBar = css({
    width: '100%',
    height: '60px',
    padding: '20px 30px',
    background: '#f96332',
    textAlign: 'center',
    boxSizing: 'border-box'
})

let btn = css({
                background: '#ffffff',
                width: '100px',
                height: '26px',
                borderRadius: '50px',
                border: 'none',
                float:'right',
                color: '#eb5322',
                outline: 'none',
                margin: '0px 10px',
                fontFamily: MontserratBold,
                '&:active': {
                    background: '#eb5322',
                    color: '#ffffff'
                }
})

const Header = () => {
    return (
        <div {...headerStyle}>
            <div {...navBar}>

                <h1 {...logoStyle}>Jukebox</h1>

                <button {...btn} type='button'>Playlist</button>
                <button {...btn} type='button'>Add Song</button>

            </div>
        </div>
    )
}

export default Header