import { call, put, takeLatest } from 'redux-saga/effects'
import database from '../Firebase'
import * as Types from './ActionTypes'



export function* fetchJukeboxes(action) {
   try {
      const ref = database.ref('jukeboxes')
      const data = yield call([ref, ref.once], 'value')

      yield put({type: Types.GOT_ALL_JUKEBOXES, data : data.val()})

   } catch (error) {
      yield put({type: Types.FAILED_TO_GET_JUKEBOXES, error})
   }
}

export function* watchGetJukeboxes() {
  yield takeLatest(Types.GET_ALL_JUKEBOXES, fetchJukeboxes)
}