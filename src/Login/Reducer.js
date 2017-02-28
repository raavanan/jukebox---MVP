import * as types from './ActionTypes'

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
    default:
      return state;
  }
}