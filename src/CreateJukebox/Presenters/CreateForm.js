import React from 'react'
import {css} from 'glamor'

/**
 *
 * file imports
 *
 */
import bg from './bg.jpg'
import {MontserratBold} from '../../Fonts'

/**
 *
 * style object for the outter wrapper
 *
 */
const wrapperStyle = css({
    width:'100%',
    background: `url(${bg}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '300px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& h1': {
        fontFamily: MontserratBold,
        fontSize: '36px',
        color:'white',
        margin:'0px'
    },
    '& span' : {
        fontSize: '12px',
        color: '#ffffff'
    }
})

/**
 *
 * style object for create jukebox form
 *
 */
const inlineForm = css({
    width: '300px',
    height: '60px',
    margin:'10px auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& input': {
        marginRight: '10px',
        borderBottom: '1px solid white',
        borderRight: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        width: '70px',
        height: '26px',
        color: 'white',
        textAlign: 'center',
        background: 'none',
        '&::-webkit-input-placeholder' : {
            color:'#ffffff',
            opacity: 0.8,
            textAlign: 'center'
        },
        '&:focus': {
            outline: 'none'
        }
    },
    '& button': {
        background: '#ffffff',
        width: '100px',
        height: '26px',
        borderRadius: '50px',
        border: 'none',
        color: '#eb5322',
        outline: 'none',
        '&:active': {
            background: '#eb5322',
            color: '#ffffff'
        }
    }
})

/**
 *
 * @function CreateForm
 * @param (object) props
 * @returns CreateForm component
 *
 */
const CreateForm = (props) => {

    return (
        <div {...wrapperStyle}>
            <h1>Create a jukebox</h1>
            <div {...inlineForm}>
                <input id='jukeboxName' type='text' placeholder='Name' />
                <input id='jukeboxGenre' type='text' placeholder='Genre' />
                <button onClick={props.createJukebox} type='button'>Create</button>
            </div>
            <span>20K Listners</span>
        </div>
    )
}

export default CreateForm