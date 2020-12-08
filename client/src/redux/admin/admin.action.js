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

export const getAllCitiesAction = ({ token }) => {
    return (dispatch) => {
        dispatch({ type: adminActionTypes.GET_ALL_CITIES_START });
        apiCall({
            method: 'GET',
            url: '/city',
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: adminActionTypes.GET_ALL_CITIES_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: adminActionTypes.GET_ALL_CITIES_FAILURE, payload: error?.response?.data?.message })
        })
    }
}

export const addCityAction = ({ city, token }) => {
    return (dispatch) => {
        dispatch({ type: adminActionTypes.ADD_CITY_START });
        apiCall({
            method: 'POST',
            url: '/city/create',
            headers: {
                'x-auth-token': token
            },
            data: { city }
        })
        .then(response => {
            dispatch({ type: adminActionTypes.ADD_CITY_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: adminActionTypes.ADD_CITY_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const deleteCityAction = ({ cityId, token }) => {
    return (dispatch) => {
        dispatch({ type: adminActionTypes.DELETE_CITY_START });
        apiCall({
            method: 'DELETE',
            url: `/city/${cityId}`,
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: adminActionTypes.DELETE_CITY_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: adminActionTypes.DELETE_CITY_FAILURE, payload: error?.response?.data?.message });
        })
    }
}