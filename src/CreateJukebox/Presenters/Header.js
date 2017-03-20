import React from 'react'
import {css} from 'glamor'

/**
 *
 * style objects for header components
 *
 */


let headerStyle = css({
    width:'100%',
    position: 'relative'
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

const logout = css({
    position:'absolute',
    right:'20px',
    zIndex: 9
})


/*--------  style objects end  --------*/


/**
 *
 * @function Header
 * @param (object) props
 * @return Header component
 */


const Header = (props) => {
    return (
        <div {...headerStyle}>
            <div {...navBar}>
                <button {...logout} onClick={props.logout}>logout</button>
                <h1 {...logoStyle}>Jukebox</h1>
            </div>
        </div>
    )
}

export default Header