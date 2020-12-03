import { adminActionTypes } from './admin.type';

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
        case adminActionTypes.GET_ALL_USER_START:
            return {
                ...state,
                loading: true,
            }

        case adminActionTypes.GET_ALL_USER_FAILURE:
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

        default:
            return state;
    }
}

export default adminReducer;