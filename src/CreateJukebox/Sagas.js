import { call, put, takeLatest } from 'redux-saga/effects'
import {Database} from '../Firebase'

import * as Types from './ActionTypes'
import {slugify} from '../global'

export function* createJukebox(action) {
   try {
     const newJukebox = (path) => Database.ref(path).push()

     const newBoxRef = yield call(newJukebox, '/')

     const jukeboxData = {
        genre : action.params.genre,
        name : action.params.name,
        slug : slugify(action.params.name),
        key : newBoxRef.key
      }

      yield call([newBoxRef, newBoxRef.set], jukeboxData)

      yield put({type: Types.SUCCESS_JUKEBOX_CREATE})

   } catch (error) {

      yield put({type: Types.FAILED_CREATE_JUKEBOX, error})

   }
}

export function* watchCreateJukeboxes() {
  yield takeLatest(Types.REQUEST_CREATE_JUKEBOX, createJukebox)
}