import { call, put, takeLatest } from 'redux-saga/effects'
import {push} from '../helpers/firebase-sagas'
import * as types from './ActionTypes'
import {slugify} from '../global'

const getRandomImage = () => {
        const number = Math.floor(Math.random() * (120 - 101 + 1)) + 101

        return number
}

export function* createJukebox(action) {
   try {
     const jukeboxData = {
        genre : action.params.genre,
        name : action.params.name,
        slug : slugify(action.params.name),
        img : `${getRandomImage()}.jpg`
      }

      yield call(push, 'jukeboxes', () => (jukeboxData), true)

      yield put({type: types.SUCCESS_JUKEBOX_CREATE})

   } catch (error) {

      yield put({type: types.FAILED_CREATE_JUKEBOX, error})

   }
}

export function* watchCreateJukeboxes() {
  yield takeLatest(types.REQUEST_CREATE_JUKEBOX, createJukebox)
}