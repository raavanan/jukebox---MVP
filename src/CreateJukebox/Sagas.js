import { call, put, takeLatest } from 'redux-saga/effects'
import {push} from '../helpers/firebase-sagas'
import * as types from './ActionTypes'


/**
 * @function createJukebox
 *
 * @param {object} action
 * generator for create a jukebox.
 */
export function* createJukebox(action) {
   try {
     /**
      *
      * @yield call
      * @param (function) push
      * @param (string) 'jukeboxes' firebase DB key
      * @param (function) anonymous function returning the jukeboxData
      * @param (boolean) flag to return the newly created DB Key
      *
      *
      */
      yield call(push, 'jukeboxes', () => (action.jukeboxData), true)

      /**
       *
       * @yield put
       * @param (object) action type SUCCESS_JUKEBOX_CREATE
       */
      yield put({type: types.SUCCESS_JUKEBOX_CREATE})

   } catch (error) {
      /**
       *
       * @yield put
       * @param (object) action type FAILED_CREATE_JUKEBOX
       */
      yield put({type: types.FAILED_CREATE_JUKEBOX, error})

   }
}

/**
 *
 * @function @generator watchCreateJukeboxes
 * @yield takeLatest
 * dispatch action REQUEST_CREATE_JUKEBOX
 *
 *
 */
export function* watchCreateJukeboxes() {
  yield takeLatest(types.REQUEST_CREATE_JUKEBOX, createJukebox)
}