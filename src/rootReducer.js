import {combineReducers} from 'redux'

import createJukebox from './CreateJukebox/Reducer'
import jukeboxes from './JukeboxGrid/Reducer'
import player from './Player/Reducer'
import login from './Login/Reducer'

const rootReducer = combineReducers({
    createJukebox,
    jukeboxes,
    player,
    login
})

export default rootReducer;