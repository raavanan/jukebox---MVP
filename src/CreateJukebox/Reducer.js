import * as types from './ActionTypes'

export default (state = {isCreating: false, isError: false}, action) => {
  switch (action.type) {
    case types.REQUEST_CREATE_JUKEBOX : {
      return {
        ...state,
        isCreating: true,
        isError: false
      }
    }

    case types.SUCCESS_JUKEBOX_CREATE : {
      return {
        ...state,
        isCreating: false,
        isError: false
      }
    }

    case types.FAILED_CREATE_JUKEBOX : {
      return {
        ...state,
        isError: true,
        error: action.error
      }
    }

    default:
      return state;
  }
}