import * as types from './ActionTypes'

export default (state = {isFetching: true, isError: false, boxes : []}, action) => {
  switch (action.type) {

    case types.GOT_ALL_JUKEBOXES : {
        const data = action.data;
            return {
                ...state,
                boxes: Object.keys(data).map(
                    (key) => Object.assign({}, {id: key}, data[key])
                ),
                isFetching: false
            }
    }

    case types.FAILED_TO_GET_JUKEBOXES : {
        return {
            ...state,
            isError: true, isFetching:false, error:action.error
        }
    }

    case types.JUKEBOX_ADDED : {
        const jukebox = {...action.jukebox.value, id: action.jukebox.key}
        const syncdBoxes = state.isFetching ? state.boxes.concat(jukebox) : [jukebox]

            return {
                ...state,
                boxes: syncdBoxes,
                isFetching : true
            }
    }

    default:
      return state;
  }
}