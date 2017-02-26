import * as types from './ActionTypes'

export default (state = {isError: false, searchResults : [], currentVideo : '', prevVideo : {}, playList: []}, action) => {
  switch (action.type) {

    case types.SUCCESS_SEARCH_RESULTS : {
      return {
        ...state,
        searchResults:action.data.items
      }
    }

    case types.GET_VIDEO_INFO : {
      return {
        ...state,
        currentVideo: action.id
      }
    }

    default:
      return state;
  }
}