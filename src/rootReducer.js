import {combineReducers} from 'redux'

import createJukebox from './CreateJukebox/Reducer'
import jukeboxes from './JukeboxGrid/Reducer'
import player from './Player/Reducer'

const rootReducer = combineReducers({
    createJukebox,
    jukeboxes,
    player
})

export default rootReducer;