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

      yield call(push, 'jukeboxes', () => (action.jukeboxData), true)

      yield put({type: types.SUCCESS_JUKEBOX_CREATE})

   } catch (error) {

      yield put({type: types.FAILED_CREATE_JUKEBOX, error})

   }
}

export function* watchCreateJukeboxes() {
  yield takeLatest(types.REQUEST_CREATE_JUKEBOX, createJukebox)
}