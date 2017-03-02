import { call, put, takeLatest, select, takeEvery, fork } from 'redux-saga/effects'
import axios from 'axios'

import * as types from './ActionTypes'
import {YOUTUBE_SEARCH_API} from '../global'
import { push, getAll, remove, CHILD_ADDED, sync } from '../helpers/firebase-sagas'
import {getKey} from './Reducer'

const getResults = (q) => {

    return axios.get(`${YOUTUBE_SEARCH_API}&q=${q}`)
            .then(res => {
                return res.data
            }, function(err){
                return err
            })
}

function* fetchSearchResults(action) {
   try {
      const data = yield call(getResults, action.q)

      yield put({type: types.SUCCESS_SEARCH_RESULTS, data})

   } catch (error) {
      yield put({type: types.FAILED_SEARCH_RESULTS, error})
   }
}

export function* addVideo(action) {
   try {

    const jukeboxKey = yield select(getKey)

    const path = `playlist-${jukeboxKey}`

    yield call(push, path, () => (action.params.video), true)

    yield put({type: types.SUCCESS_ADD_VIDEO})

    yield put({type: types.SYNC_PLAYLIST})

   } catch (error) {

      yield put({type: types.FAILED_ADD_VIDEO, error})

   }
}

function* getPlaylist(action){
    try {
     const jukeboxKey = yield select(getKey)

     const path = `playlist-${jukeboxKey}`

     const playlist = yield call(getAll, path)

     yield put({type: types.GOT_PLAYLIST, playlist})

    } catch (error) {
        yield put({type: types.FAILED_GET_PLAYLIST, error})
    }
}

function* playNext(action){
    try {
        const jukeboxKey = yield select(getKey)

        const path = `playlist-${jukeboxKey}`

        const video = action.video

        console.log(jukeboxKey, video)

        yield call(remove, path, video.itemId)

        yield call(push, `${path}-prev`, () => (video))

        yield getPlaylist()

        yield put({type: types.PLAY_NEXT})

    } catch (error) {

    }
}

export function* watchGetSearchResults() {
  yield takeLatest(types.GET_SEARCH_RESULTS, fetchSearchResults)
}

export function* watchAddVideo() {
  yield takeEvery(types.ADD_VIDEO, addVideo)
}

export function* watchGetPlaylist() {
    yield takeEvery(types.GET_PLAYLIST, getPlaylist)
}

export function* watchVideoEnded() {
    yield takeEvery(types.VIDEO_ENDED, playNext)
}

function videoAdded(video){
  return {
    type: types.VIDEO_ADDED,
    video
  }
}

function* syncPlaylist() {
    const jukeboxKey = yield select(getKey)

    const path = `playlist-${jukeboxKey}`

    yield fork(sync, path, {
        [CHILD_ADDED]: videoAdded
    })
}

export function* watchSyncPlaylist() {
  yield takeEvery(types.SYNC_PLAYLIST, syncPlaylist)
}


