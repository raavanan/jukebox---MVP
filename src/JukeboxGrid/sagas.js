import { call, put, takeLatest, fork, takeEvery } from 'redux-saga/effects'
import {getAll, sync, CHILD_ADDED, CHILD_REMOVED} from '../helpers/firebase-sagas'

import * as types from './ActionTypes'



export function* fetchJukeboxes(action) {
   try {

     const data = yield call(getAll, 'jukeboxes')

      yield put({type: types.GOT_ALL_JUKEBOXES, data})

      yield put({type: types.SYNC_JUKEBOXES})

   } catch (error) {
      yield put({type: types.FAILED_TO_GET_JUKEBOXES, error})
   }
}

export function* watchGetJukeboxes() {
  yield takeLatest(types.GET_ALL_JUKEBOXES, fetchJukeboxes)
}

function jukeboxAdded(jukebox){
  return {
    type: types.JUKEBOX_ADDED,
    jukebox
  }
}

function jukeboxRemoved(jukebox){
  return {
    type: types.JUKEBOX_REMOVED,
    jukebox
  }
}

function* syncJukebox() {
    yield fork(sync, 'jukeboxes', {
        [CHILD_ADDED]: jukeboxAdded,
        [CHILD_REMOVED]: jukeboxRemoved
    })
}

export function* watchSyncJukebox() {
  yield takeEvery(types.SYNC_JUKEBOXES, syncJukebox)
}