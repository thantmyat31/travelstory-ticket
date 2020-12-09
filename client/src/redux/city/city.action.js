import { cityActionTypes } from './city.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

export const getAllCitiesAction = () => {
    return (dispatch) => {
        dispatch({ type: cityActionTypes.GET_ALL_CITIES_START });
        apiCall({
            method: 'GET',
            url: '/city'
        })
        .then(response => {
            dispatch({ type: cityActionTypes.GET_ALL_CITIES_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: cityActionTypes.GET_ALL_CITIES_FAILURE, payload: error?.response?.data?.message })
        })
    }
}

export const addCityAction = ({ city, token }) => {
    return (dispatch) => {
        dispatch({ type: cityActionTypes.ADD_CITY_START });
        apiCall({
            method: 'POST',
            url: '/city/create',
            headers: {
                'x-auth-token': token
            },
            data: { city }
        })
        .then(response => {
            dispatch({ type: cityActionTypes.ADD_CITY_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: cityActionTypes.ADD_CITY_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const deleteCityAction = ({ cityId, token }) => {
    return (dispatch) => {
        dispatch({ type: cityActionTypes.DELETE_CITY_START });
        apiCall({
            method: 'DELETE',
            url: `/city/${cityId}`,
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: cityActionTypes.DELETE_CITY_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: cityActionTypes.DELETE_CITY_FAILURE, payload: error?.response?.data?.message });
        })
    }
}