import {watchGetJukeboxes, watchSyncJukebox} from './JukeboxGrid/Sagas'
import {watchGetSearchResults, watchAddVideo, watchGetPlaylist, watchVideoEnded, watchSyncPlaylist, watchPlaytimeUpdate, watchVoteNext} from './Player/Sagas'
import {watchLoginGoogle} from './Login/Sagas'
import {watchCreateJukeboxes} from './CreateJukebox/Sagas'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    watchGetJukeboxes(),
    watchGetSearchResults(),
    watchLoginGoogle(),
    watchCreateJukeboxes(),
    watchSyncJukebox(),
    watchAddVideo(),
    watchGetPlaylist(),
    watchVideoEnded(),
    watchSyncPlaylist(),
    watchPlaytimeUpdate(),
    watchVoteNext()
  ]
}