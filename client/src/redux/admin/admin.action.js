import { adminActionTypes } from './admin.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

export const getAllUsersAction = (token) => {
    return (dispatch) => {
        dispatch({ type: adminActionTypes.GET_ALL_USER_START });
        apiCall({
            method: 'GET',
            url: '/user/all',
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: adminActionTypes.GET_ALL_USER_SUCCESS, payload: response?.data })
        })
        .catch(error => {
            dispatch({ type: adminActionTypes.GET_ALL_USER_FAILURE, payload: error?.response?.data?.message })
        })
    }
}

export const updateUserRoleAction = ({ userId, userRole, token }) => {
    return (dispatch) => {
        dispatch({ type: adminActionTypes.UPDATE_USER_ROLE_START });
        apiCall({
            method: 'PUT',
            url: `/user/${userId}`,
            headers: {
                'x-auth-token': token
            },
            data: { newRole: userRole }
        })
        .then(response => {
            dispatch({ type: adminActionTypes.UPDATE_USER_ROLE_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: adminActionTypes.UPDATE_USER_ROLE_FAILURE, payload: error?.response?.data?.message })
        })
    }
}

export const deleteUserAction = ({ userId, token }) => {
    return (dispatch) => {
        dispatch({ type: adminActionTypes.DELETE_USER_START });
        apiCall({
            method: 'DELETE',
            url: `/user/${userId}`,
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: adminActionTypes.DELETE_USER_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: adminActionTypes.GET_ALL_USER_FAILURE, payload: error?.response?.data?.message });
        })
    }
}
