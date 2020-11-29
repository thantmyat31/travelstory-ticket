import { userActionTypes } from './user.type';
import axios from 'axios';

export const userLoginAction = (credentials) => {
    return (dispatch) => {
        dispatch({ type: userActionTypes.USER_LOGIN_START });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/user/login`,
            data: credentials
        })
        .then(response => {
            dispatch({ type: userActionTypes.USER_LOGIN_SUCCESS, payload: response.data });
            dispatch(checkAuth());
        })
        .catch(error => {
            let errorPayload = '';
            if(error.response.data.message) errorPayload = error.response.data.message;
            else errorPayload = 'Registratio failed. Try again later.';
            
            dispatch({ type: userActionTypes.USER_LOGIN_FAILURE, payload: errorPayload })
        })
    }
}

export const userRegisterAction = (credentials) => {
    return (dispatch) => {
        dispatch({ type: userActionTypes.USER_REGISTER_START });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/user/register`,
            data: credentials
        })
        .then(response => {
            dispatch({ type: userActionTypes.USER_REGISTER_SUCCESS, payload: response.data });
            dispatch(checkAuth());
        })
        .catch(error => {
            let errorPayload = '';
            if(error.response.data.message) errorPayload = error.response.data.message;
            else errorPayload = 'Registratio failed. Try again later.';
            
            dispatch({ type: userActionTypes.USER_REGISTER_FAILURE, payload: errorPayload });
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