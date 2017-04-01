import * as types from './ActionTypes'

/**
 *
 * jukegrid reducer
 *
 */
export default (state = {isFetching: true, isError: false, boxes : []}, action) => {
  switch (action.type) {

    /**
     *
     * case GOT_ALL_JUKEBOXES
     * parse the object from firebase to form an array
     * of boxes
     *
     */
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

    /**
     *
     * case JUKEBOX_ADDED
     * concat newly added jukebox to boxes
     *
     */
    case types.JUKEBOX_ADDED : {
        const jukebox = {...action.jukebox.value, id: action.jukebox.key}
        const syncdBoxes = state.isFetching ? state.boxes.concat(jukebox) : [jukebox]

            return {
                ...state,
                boxes: syncdBoxes,
                isFetching : true
            }
    }

    /**
     *
     * case JUKEBOX_REMOVED
     * pop the jukebox which was deleted from boxes
     *
     */
    case types.JUKEBOX_REMOVED : {
        const syncdBoxes = state.boxes.pop({...action.jukebox.value, id: action.jukebox.key})
        return {
            boxes: syncdBoxes,
            ...state
        }
    }

    default:
      return state;
  }
}

export const getUserId = (state) => (state.login.user.uid)