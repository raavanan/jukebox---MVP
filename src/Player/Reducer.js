import * as types from './ActionTypes'

const baseState = {
    isError: false,
    playlistEmpty:true,
    playlist : [],
    searchResults : [],
    currentVideo : '',
    prevVideo : {},
    isSyncing : false,
    creator : {}
  }

export default (state = baseState, action) => {
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
        ...action.params,
        playlistEmpty: false
      }
    }

    case types.FAILED_ADD_VIDEO : {
      return {
        ...state,
        error : action.error
      }
    }

    case types.GET_PLAYLIST : {
      return {
        ...state,
        id : action.id
      }
    }

    case types.GOT_PLAYLIST : {
      const list = action.playlist,
      playlist = Object.keys(list).map(
                    (key) => Object.assign({}, {itemId: key}, list[key])
                )

      return {
        ...state,
        playlist,
        playlistEmpty : false,
        currentVideo : playlist[0]
      }
    }

    case types.FAILED_GET_PLAYLIST : {
      return {
        ...state,
        playlistError: action.error
      }
    }

    case types.LISTEN_JUKEBOX : {
      return {
        ...state,
        ...action.box
      }
    }

    case types.VIDEO_ADDED : {
        const video = {...action.video.value, itemId: action.video.key}
        const syncdList = state.isSyncing ? state.playlist.concat(video) : [video]

            return {
                ...state,
                playlist: syncdList,
                isSyncing : true
            }
    }

    case types.VIDEO_REMOVED : {
        const syncdList = state.playlist.pop({...action.video.value, id: action.video.key}),
        playlistEmpty = syncdList.length === 0 ? true : false
        return {
            playlist: syncdList,
            playlistEmpty,
            ...state
        }
    }

    case types.RESET_PLAYER : {
      return {
        ...baseState
      }
    }

    case types.VOTE_UPDATED : {
      return Object.assign({}, state, { currentVideo : {...state.currentVideo, nextVoteCount : action.count} })
    }

    default:
      return state;
  }
}

export const getKey  = (state) => (state.player.id)

export const getCurrentVideo = (state) => (state.player.currentVideo)

export const getCreatorId = (state) => (state.player.creator.uid)