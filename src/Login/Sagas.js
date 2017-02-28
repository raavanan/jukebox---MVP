import { call, put, takeLatest } from 'redux-saga/effects'
import {Auth} from '../Firebase'

import * as Types from './ActionTypes'
import {GOOGLE_LOGIN_API} from '../global'


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

export function* requestGoogleLogin(action) {
   try {

       const user = yield call(googleLogin)
       yield put({type: Types.GOOGLE_LOGIN_SUCCESS, user})

   } catch (error) {

      yield put({type: Types.FAILED_GOOGLE_LOGIN, error})

   }
}

export function* watchLoginGoogle() {
  yield takeLatest(Types.REQUEST_GOOGLE_LOGIN, requestGoogleLogin)
}