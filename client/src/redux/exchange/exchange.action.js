import { exchangeActionTypes } from './exchange.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const getExchangeRateAction = () => {
    return (dispatch) => {
        dispatch({ type: exchangeActionTypes.GET_EXCHANGE_RATE_START });
        apiCall({
            method: 'GET',
            url: '/exchange'
        })
        .then(response => {
            dispatch({ type: exchangeActionTypes.GET_EXCHANGE_RATE_SUCCESS, payload: response?.data })
        })
        .catch(error => {
            dispatch({ type: exchangeActionTypes.GET_EXCHANGE_RATE_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const createExchangeRateAction = ({ exchangeRate, token }) => {
    return (dispatch) => {
        dispatch({ type: exchangeActionTypes.CREATE_EXCHANGE_RATE_START });
        apiCall({
            method: 'POST',
            url: '/exchange/create',
            headers: {
                'x-auth-token': token
            },
            data: exchangeRate
        })
        .then(response => {
            dispatch({ type: exchangeActionTypes.CREATE_EXCHANGE_RATE_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: exchangeActionTypes.CREATE_EXCHANGE_RATE_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const updateExchangeRateAction = ({ exchangeRate, token }) => {
    return (dispatch) => {
        dispatch({ type: exchangeActionTypes.UPDATE_EXCHANGE_RATE_START });
        apiCall({
            method: 'PUT',
            url: `/exchange/update`,
            headers: {
                'x-auth-token': token
            },
            data: exchangeRate
        })
        .then(response => {
            dispatch({ type: exchangeActionTypes.UPDATE_EXCHANGE_RATE_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: exchangeActionTypes.UPDATE_EXCHANGE_RATE_FAILURE, payload: error?.response?.data?.message });
        })
    }
}