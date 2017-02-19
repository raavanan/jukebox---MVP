import React from 'react'
import {css} from 'glamor'

let headerStyle = css({
    width:'100%'
})

let logoStyle = css({
    color: 'white',
    fontSize: '18px',
    margin:'0px'
})

let navBar = css({
    width: '100%',
    height: '60px',
    padding: '20px 30px',
    background: '#f96332',
    textAlign: 'center',
    boxSizing: 'border-box'
})

const Header = () => {
    return (
        <div {...headerStyle}>
            <div {...navBar}>
                <h1 {...logoStyle}>Jukebox</h1>
            </div>
        </div>
    )
}

export default Header