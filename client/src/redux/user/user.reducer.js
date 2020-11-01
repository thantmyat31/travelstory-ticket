import { userActionTypes } from './user.type';

const INITIAL_STATE = {
    token: undefined,
    currentUser: undefined,
    error: null,
    loading: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.SAVE_USER_IN_STATE:
            return {
                ...state,
                currentUser: action.payload.user,
                token: action.payload.token
            }

        case userActionTypes.USER_LOGOUT:
            return {
                ...state,
                currentUser: undefined,
                token: undefined
            }

        default:
            return state;
    }
}

export default userReducer;