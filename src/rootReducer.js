import {combineReducers} from 'redux'
import createJukebox from './CreateJukebox/Reducer'
import jukeboxes from './JukeboxGrid/Reducer'

const rootReducer = combineReducers({
    createJukebox,
    jukeboxes
})

export default rootReducer;