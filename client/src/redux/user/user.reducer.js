import { userActionTypes } from './user.type';

const INITIAL_STATE = {
    token: undefined,
    user: undefined,
    error: null,
    loading: false,
    isAuth: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.USER_REGISTER_START:
        case userActionTypes.USER_LOGIN_START:
            return {
                ...state,
                loading: true
            }
        
        case userActionTypes.USER_REGISTER_FAILURE:
        case userActionTypes.USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                count: state.count
            }

        case userActionTypes.USER_REGISTER_SUCCESS:
        case userActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            }

        case userActionTypes.USER_LOGOUT_ACTION:
            return {
                ...state,
                user: undefined,
                token: undefined
            }

        case userActionTypes.CHECK_AUTH:
        case userActionTypes.ERROR_RESET:
            return {
                ...state,
                isAuth: state.user && state.token ? true : false,
                error: null
            }
        
        default:
            return state;
    }
}

export default userReducer;