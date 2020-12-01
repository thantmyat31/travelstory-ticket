import { userActionTypes } from './user.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
})

export const userLoginAction = (credentials) => {
    return (dispatch) => {
        dispatch({ type: userActionTypes.USER_LOGIN_START });
        apiCall({
            method: 'POST',
            url: `/login`,
            data: credentials
        })
        .then(response => {
            dispatch({ type: userActionTypes.USER_LOGIN_SUCCESS, payload: response.data });
            dispatch(checkAuth());
        })
        .catch(error => {
            let errorPayload = '';
            if(error?.response?.data?.message) errorPayload = error.response.data.message;
            else errorPayload = 'Login failed. Try again later.';
            
            dispatch({ type: userActionTypes.USER_LOGIN_FAILURE, payload: errorPayload })
        })
    }
}

export const userRegisterAction = (credentials) => {
    return (dispatch) => {
        dispatch({ type: userActionTypes.USER_REGISTER_START });
        apiCall({
            method: 'POST',
            url: `/register`,
            data: credentials
        })
        .then(response => {
            dispatch({ type: userActionTypes.USER_REGISTER_SUCCESS, payload: response?.data?.message });
            dispatch(checkAuth());
        })
        .catch(error => {
            let errorPayload = '';
            if(error?.response?.data?.message) errorPayload = error.response.data.message;
            else errorPayload = 'Registration failed. Try again later.';
            
            dispatch({ type: userActionTypes.USER_REGISTER_FAILURE, payload: errorPayload });
        })
    }
}

export const accountActivationAction = (token) => {
    return (dispatch) => {
        dispatch({ type: userActionTypes.ACCOUNT_ACTIVATION_START });
        apiCall({
            method: 'POST',
            url: `/account-activation`,
            data: { token }
        })
        .then(response => {
            dispatch({ type: userActionTypes.ACCOUNT_ACTIVATION_SUCCESS, payload: response.data });
            dispatch(checkAuth());
        })
        .catch(error => {
            let errorPayload = '';
            if(error?.response?.data?.message) errorPayload = error.response.data.message;
            else errorPayload = 'Account activating failed. Try again later.';
            
            dispatch({ type: userActionTypes.ACCOUNT_ACTIVATION_FAILURE, payload: errorPayload });
        })
    }
}

export const checkUserTokenStatusAction = (token) => {
    return (dispatch) => {
        dispatch({ type: userActionTypes.CHECK_TOKEN_STATUS_START });
        apiCall({
            method: 'POST',
            url: '/',
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: userActionTypes.CHECK_TOKEN_STATUS_SUCCESS, payload: response?.data?.message });
        })
        .catch(error => {
            dispatch({ type: userActionTypes.CHECK_TOKEN_STATUS_FAILURE, payload: error?.response?.data?.message });
            dispatch(userLogoutAction());
        })
    }
} 

export const userLogoutAction = () => {
    return (dispatch) => {
        dispatch({ type: userActionTypes.USER_LOGOUT_ACTION });
        dispatch(checkAuth());
    }
}

export const checkAuth = () => ({
    type: userActionTypes.CHECK_AUTH
});

export const errorReset = () => ({
    type: userActionTypes.ERROR_RESET
});