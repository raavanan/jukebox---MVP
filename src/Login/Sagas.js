import { call, put, takeLatest } from 'redux-saga/effects'
import {Auth} from '../Firebase'

/*********  File imports  **********/

import * as Types from './ActionTypes'
import {GOOGLE_LOGIN_API} from '../global'

/**
 *
 * @function googleLogin
 * initiate google auth process
 * @return (promise) google auth promise
 *
 */
function googleLogin (){
    const provider = new Auth.GoogleAuthProvider()

    provider.addScope(GOOGLE_LOGIN_API)

    return Auth().signInWithPopup(provider)
            .then(results => {
                return results
            })
            .catch(err => {
                return err
            })
}

/**
 *
 * @function requestGoogleLogin
 * @param (object) action
 *
 */
export function* requestGoogleLogin(action) {
   try {
    /* yield googleLogin to get user data */
       const user = yield call(googleLogin)

    /*--------  dispatch GOOGLE_LOGIN_SUCCESS on login  --------*/

       yield put({type: Types.GOOGLE_LOGIN_SUCCESS, user})

   } catch (error) {

    /*--------  dispatch FAILED_GOOGLE_LOGIN on error during login  --------*/

      yield put({type: Types.FAILED_GOOGLE_LOGIN, error})

   }
}

/**
 *
 * @function watchLoginGoogle
 * takeLatest REQUEST_GOOGLE_LOGIN and init requestGoogleLogin
 */
export function* watchLoginGoogle() {
  yield takeLatest(Types.REQUEST_GOOGLE_LOGIN, requestGoogleLogin)
}