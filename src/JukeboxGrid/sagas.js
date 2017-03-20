import { call, put, takeLatest, fork, takeEvery } from 'redux-saga/effects'

import {getAll, sync, CHILD_ADDED, CHILD_REMOVED} from '../helpers/firebase-sagas'
import * as types from './ActionTypes'


/**
 *
 * @function* fetchJukeboxes
 * @param (object) action
 * get all jukeboxes from DB
*/
export function* fetchJukeboxes(action) {
   try {

     const data = yield call(getAll, 'jukeboxes')

      yield put({type: types.GOT_ALL_JUKEBOXES, data})

      yield put({type: types.SYNC_JUKEBOXES})

   } catch (error) {
      yield put({type: types.FAILED_TO_GET_JUKEBOXES, error})
   }
}

/**
 *
 * @function* watchGetJukeboxes
 * watch for latest action type GET_ALL_JUKEBOXES and fetchJukeboxes
 */
export function* watchGetJukeboxes() {
  yield takeLatest(types.GET_ALL_JUKEBOXES, fetchJukeboxes)
}

/**
 *
 * @function jukeboxAdded
 * @param (object) jukebox
 * dispatch action JUKEBOX_ADDED with payload
 *
 */
function jukeboxAdded(jukebox){
  return {
    type: types.JUKEBOX_ADDED,
    jukebox
  }
}

/**
 *
 * @function jukeboxRemoved
 * @param (object) jukebox
 * dispatch action JUKEBOX_REMOVED with payload
 */
function jukeboxRemoved(jukebox){
  return {
    type: types.JUKEBOX_REMOVED,
    jukebox
  }
}

/**
 *
 * @function syncJukebox
 * listen for events CHILD_ADDED and CHILD_REMOVED
 */
function* syncJukebox() {
    yield fork(sync, 'jukeboxes', {
        [CHILD_ADDED]: jukeboxAdded,
        [CHILD_REMOVED]: jukeboxRemoved
    })
}

/**
 *
 * @function watchGetJukeboxes
 * watch for SYNC_JUKEBOXES action and call syncJukebox function
 */
export function* watchSyncJukebox() {
  yield takeEvery(types.SYNC_JUKEBOXES, syncJukebox)
}