import { userActionTypes } from './user.type';

const INITIAL_STATE = {
    token: undefined,
    user: undefined,
    loading: false,
    isAuth: false,
    error: null,
    registerSuccessMessage: null,
    tokenStatus: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.USER_REGISTER_START:
        case userActionTypes.USER_LOGIN_START:
        case userActionTypes.ACCOUNT_ACTIVATION_START:
        case userActionTypes.CHECK_TOKEN_STATUS_START:
            return {
                ...state,
                loading: true
            }
        
        case userActionTypes.USER_REGISTER_FAILURE:
        case userActionTypes.USER_LOGIN_FAILURE:
        case userActionTypes.ACCOUNT_ACTIVATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case userActionTypes.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                registerSuccessMessage: action.payload
            }
        
        case userActionTypes.USER_LOGIN_SUCCESS:
        case userActionTypes.ACCOUNT_ACTIVATION_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            }
        
        case userActionTypes.CHECK_TOKEN_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                tokenStatus: action.payload
            }
        
        case userActionTypes.CHECK_TOKEN_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                tokenStatus: action.payload
            }

        case userActionTypes.USER_LOGOUT_ACTION:
            return {
                ...state,
                user: undefined,
                token: undefined,
                error: null,
                registerSuccessMessage: null
            }

        case userActionTypes.CHECK_AUTH:
        case userActionTypes.ERROR_RESET:
            return {
                ...state,
                isAuth: state.user && state.token ? true : false,
                error: null,
                registerSuccessMessage: null
            }
        
        default:
            return state;
    }
}

export default userReducer;