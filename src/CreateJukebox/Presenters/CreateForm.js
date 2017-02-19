import React from 'react'
import {css} from 'glamor'

import bg from './bg.jpg'
import {MontserratBold} from '../../Fonts'

let wrapperStyle = css({
    width:'100%',
    background: `url(${bg}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '300px',
    textAlign: 'center',
    paddingTop: '100px',
    '& h1': {
        fontFamily: MontserratBold,
        fontSize: '36px',
        color:'white',
        margin:'0px'
    }
})

const CreateForm = () => {
    return (
        <div {...wrapperStyle}>
            <h1>Create jukebox</h1>
        </div>
    )
}

export default CreateForm