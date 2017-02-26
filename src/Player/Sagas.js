import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import * as Types from './ActionTypes'
import {YOUTUBE_SEARCH_API} from '../global'

const getResults = (q) => {

    return axios.get(`${YOUTUBE_SEARCH_API}&q=${q}`)
            .then(res => {
                return res.data
            }, function(err){
                console.log(err)
            })
}

export function* fetchSearchResults(action) {
   try {
      const data = yield call(getResults, action.q)

      yield put({type: Types.SUCCESS_SEARCH_RESULTS, data})

   } catch (error) {
      yield put({type: Types.FAILED_SEARCH_RESULTS, error})
   }
}

export function* watchGetSearchResults() {
  yield takeLatest(Types.GET_SEARCH_RESULTS, fetchSearchResults)
}