import * as types from './ActionTypes'

/**
 *
 * login reducer
 *
 */
export default (state = {user : {} }, action) => {
  switch (action.type) {

    case types.GOOGLE_LOGIN_SUCCESS : {
        return {
            ...state,
            user: action.user
        }
    }

    case types.FAILED_GOOGLE_LOGIN : {
        return {
            ...state,
            isError: true, error: action.error
        }
    }

    case types.SET_USER : {
        return {
            ...state,
            user : action.user
        }
    }

    default:
      return state;
  }
}