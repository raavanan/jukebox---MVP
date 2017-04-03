import { call, put, takeLatest, fork, takeEvery, select } from 'redux-saga/effects'
import { Database } from '../Firebase'

import {getAll, sync, CHILD_ADDED, CHILD_REMOVED} from '../helpers/firebase-sagas'
import * as types from './ActionTypes'
import {getUserId} from './Reducer'


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

function* enterJukebox(action) {
  const key = action.id,
  uid = yield select(getUserId)

    const ref = Database.ref('jukeboxes').child(key)

    function addListner (box) {
        if (box) {
                if (!box.listners) {
                    box.listners = {}
                }
                if(!box.listners[uid]){
                    box.listnerCount++
                    box.listners[uid] = true
                }
            }
        return box
    }

    yield call([ref, ref.transaction], addListner)
}

function* leaveJukebox(action) {
  const key = action.id,
  uid = yield select(getUserId)

  const ref = Database.ref('jukeboxes').child(key)

    function removeListner (box) {
        if (box) {
                    box.listnerCount--
                    box.listners[uid] = null
            }
        return box
    }

    yield call([ref, ref.transaction], removeListner)
}

/**
 *
 * @function watchGetJukeboxes
 * watch for SYNC_JUKEBOXES action and call syncJukebox function
 */
export function* watchSyncJukebox() {
  yield takeEvery(types.SYNC_JUKEBOXES, syncJukebox)
}

/**
 *
 * @function watchEnterJukebox
 * watch for ENTER_JUKEBOX action and call enterJukebox
 */
export function* watchEnterJukebox() {
    yield takeEvery(types.ENTER_JUKEBOX, enterJukebox)
}

/**
 *
 * @function watchLeaveJukebox
 * watch for LEAVE_JUKEBOX action and call leaveJukebox
 */
export function* watchLeaveJukebox() {
    yield takeEvery(types.LEAVE_JUKEBOX, leaveJukebox)
}