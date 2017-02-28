import * as types from './ActionTypes'

export default (state = {isError: false,playlistEmpty:true, searchResults : [], currentVideo : '', prevVideo : {}, playList: []}, action) => {
  switch (action.type) {

    case types.SUCCESS_SEARCH_RESULTS : {
      return {
        ...state,
        searchResults:action.data.items
      }
    }

    case types.ADD_VIDEO : {
      return {
        ...state,
        currentVideo: action.video,
        searchResults: []
      }
    }

    case types.SET_JUKEBOX_ID : {
      return {
        ...state,
        id : action.id
      }
    }

    default:
      return state;
  }
}