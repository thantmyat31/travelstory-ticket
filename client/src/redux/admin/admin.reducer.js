import { adminActionTypes } from './admin.type';
import { userActionTypes } from './../user/user.type';

const INITIAL_STATE = {
    users : [],
    admins: [],
    subscribers: [],
    agencies: [],
    error: null,
    loading: false
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.USER_LOGOUT_ACTION:
            return {
                ...state,
                users : [],
                admins: [],
                subscribers: [],
                agencies: [],
                error: null,
                loading: false
            }
            
        case adminActionTypes.GET_ALL_USER_START:
        case adminActionTypes.UPDATE_USER_ROLE_START:
        case adminActionTypes.DELETE_USER_START:
            return {
                ...state,
                loading: true,
            }

        case adminActionTypes.GET_ALL_USER_FAILURE:
        case adminActionTypes.UPDATE_USER_ROLE_FAILURE:
        case adminActionTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case adminActionTypes.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                users: action.payload,
                admins: action.payload.filter(user => user.role === 'admin'),
                subscribers: action.payload.filter(user => user.role === 'subscriber'),
                agencies: action.payload.filter(user => user.role === 'agency'),
            }

        case adminActionTypes.UPDATE_USER_ROLE_SUCCESS:
            const updatedUsersRole = state.users.map(user => user._id === action.payload._id ? {...user, role: action.payload.role} : user );
            return {
                ...state,
                loading: false,
                error: null,
                users: updatedUsersRole,
                admins: updatedUsersRole.filter(user => user.role === 'admin'),
                subscribers: updatedUsersRole.filter(user => user.role === 'subscriber'),
                agencies: updatedUsersRole.filter(user => user.role === 'agency'),
            }

        case adminActionTypes.DELETE_USER_SUCCESS:
            const updatedUsersList = state.users.filter(user => user._id !== action.payload._id);
            return {
                ...state,
                loading: false,
                error: null,
                users: updatedUsersList,
                admins: updatedUsersList.filter(user => user.role === 'admin'),
                subscribers: updatedUsersList.filter(user => user.role === 'subscriber'),
                agencies: updatedUsersList.filter(user => user.role === 'agency'),
            }

        case userActionTypes.ERROR_RESET:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state;
    }
}

export default adminReducer;