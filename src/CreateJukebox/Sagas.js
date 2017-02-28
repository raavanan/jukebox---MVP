import { call, put, takeLatest } from 'redux-saga/effects'
import {push} from '../helpers/firebase-sagas'
import * as types from './ActionTypes'
import {SYNC_JUKEBOXES} from '../JukeboxGrid/ActionTypes'
import {slugify} from '../global'

export function* createJukebox(action) {
   try {
     const jukeboxData = {
        genre : action.params.genre,
        name : action.params.name,
        slug : slugify(action.params.name)
      }

      yield call(push, 'jukeboxes', () => (jukeboxData))

      yield put({type: types.SUCCESS_JUKEBOX_CREATE})

      yield put({type: SYNC_JUKEBOXES})

   } catch (error) {

      yield put({type: types.FAILED_CREATE_JUKEBOX, error})

   }
}

export function* watchCreateJukeboxes() {
  yield takeLatest(types.REQUEST_CREATE_JUKEBOX, createJukebox)
}