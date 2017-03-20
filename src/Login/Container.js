import React, {Component} from 'react'
import {connect} from 'react-redux'
import {css} from 'glamor'


/*********  File imports  **********/

import {REQUEST_GOOGLE_LOGIN} from './ActionTypes'
import bg from './login.jpg'



class Login extends Component {
    
    /**================================================== *
     * ==========  Style object begin  ========== *
     * ================================================== */
    
    
    
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

    /* =======  End of Section comment block  ======= */

    /**
     *
     * @function googleLogin
     *  dispatch REQUEST_GOOGLE_LOGIN to init login process
     */
    googleLogin = () => {
        this.props.dispatch({type:REQUEST_GOOGLE_LOGIN})
    }

    /*********  render  **********/

    render() {
        return (
            <div className={this.loginWrapper}>
                <button onClick={this.googleLogin} className='login-google'>Google login</button>
            </div>
        )
    }
}

/**
 *
 * mapStateToProps
 * user : logged in user data
 *
 */
function mapStateToProps (state) {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps)(Login)