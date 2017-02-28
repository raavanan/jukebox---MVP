import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'

import {REQUEST_GOOGLE_LOGIN} from './ActionTypes'
import bg from './login.jpg'



class Login extends Component {

    loginWrapper = css({
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        color: '#fff',
        height: '100vh',
        width: '100%',
        '& .login-google':{
            width: '325px',
	        height: '55px',
            margin: 'auto',
            position: 'absolute',
            top:0,
            bottom: 0,
            left: 0,
            right: 0,
	        borderRadius: '50px',
	        backgroundColor: '#f96332',
            border:'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize:'18px',
            '&:focus':{
                outline: 'none'
            }
        }
    })

    googleLogin = () => {
        this.props.dispatch({type:REQUEST_GOOGLE_LOGIN})
    }

    render() {
        return (
            <div className={this.loginWrapper}>
                <button onClick={this.googleLogin} className='login-google'>Google login</button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps)(Login)