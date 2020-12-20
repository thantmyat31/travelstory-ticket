import { tripActionTypes } from './trip.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

export const getAllTripsAction = () => {
    return (dispatch) => {
        dispatch({ type: tripActionTypes.GET_ALL_TRIPS_START });
        apiCall({
            method: 'GET',
            url: '/trip'
        })
        .then(response => {
            dispatch({ type: tripActionTypes.GET_ALL_TRIPS_SUCCESS, payload: response?.data })
        })
        .catch(error => {
            dispatch({ type: tripActionTypes.GET_ALL_TRIPS_FAILURE, payload: error?.response?.data?.message })
        })
    }
}

export const getTripsByAgencyAction = ({ agencyId, token }) => {
    return (dispatch) => {
        dispatch({ type: tripActionTypes.GET_TRIPS_BY_AGENCY_START });
        apiCall({
            method: 'GET',
            url: `/trip/${agencyId}`,
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: tripActionTypes.GET_TRIPS_BY_AGENCY_SUCCESS, payload: response?.data })
        })
        .catch(error => {
            dispatch({ type: tripActionTypes.GET_TRIPS_BY_AGENCY_FAILURE, payload: error?.response?.data?.message })
        })
    }
}

export const createTripAction = ({ data, token }) => {
    return (dispatch) => {
        dispatch({ type: tripActionTypes.TRIP_CREATE_START })
        apiCall({
            method: 'POST',
            url: '/trip/create',
            headers: {
                'x-auth-token': token
            },
            data: { ...data }
        })
        .then(response => {
            dispatch({ type: tripActionTypes.TRIP_CREATE_SUCCESS, payload: response?.data })
        })
        .catch(error => {
            dispatch({ type: tripActionTypes.TRIP_CREATE_FAILURE, payload: error?.response?.data?.message })
        })
    }
}

export const getTripById = (tripId) => ({
    type: tripActionTypes.GET_TRIP_BY_ID,
    payload: tripId
});

export const updateSeatsAction = ({ selectedSeats, tripId }) => {
    return (dispatch) => {
        dispatch({ type: tripActionTypes.UPDATE_SEATS_START });
        apiCall({
            method: 'PUT',
            url: `/trip/${tripId}`,
            data: selectedSeats
        })
        .then(response => {
            dispatch({ type: tripActionTypes.UPDATE_SEATS_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: tripActionTypes.UPDATE_SEATS_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const tripDeleteAction = ({ tripId, token }) => {
    return (dispatch) => {
        dispatch({ type: tripActionTypes.TRIP_DELETE_START });
        apiCall({
            method: 'DELETE',
            url: `/trip/${tripId}`,
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: tripActionTypes.TRIP_DELETE_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            dispatch({ type: tripActionTypes.TRIP_DELETE_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const searchTripsAction = ({ data }) => ({ 
    type: tripActionTypes.SEARCH_TRIPS,
    payload: data
});

export const clearSearchTripsAction = () => ({
    type: tripActionTypes.CLEAR_SEARCH_TRIPS
})

export const tripsFilterRunAction = () => ({
    type: tripActionTypes.TRIPS_FILTER_RUN
});