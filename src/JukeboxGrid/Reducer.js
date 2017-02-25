import * as types from './ActionTypes'

export default (state = {isFetching: false, isError: false, jukeboxes : []}, action) => {
  switch (action.type) {

    case types.GET_ALL_JUKEBOXES : {
        return {
            ...state,
            isFetching: true
        }
    }

    case types.GOT_ALL_JUKEBOXES : {
        return {
            ...state,
            jukeboxes: action.data, isFetching: false
        }
    }

    case types.FAILED_TO_GET_JUKEBOXES : {
        return {
            ...state,
            isError: true, isFetching:false, error:action.error
        }
    }
    default:
      return state;
  }
}