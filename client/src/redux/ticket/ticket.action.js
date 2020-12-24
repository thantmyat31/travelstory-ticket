import { ticketActionTypes } from './ticket.type';
import axios from 'axios';
import { clearSearchTripsAction, updateSeatsAction } from './../trip/trip.action';

const apiCall = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
})

export const selectSeatAction = ({selectedSeats, tripId}) => ({
    type: ticketActionTypes.SELECT_SEATS,
    payload: { selectedSeats, tripId}
});

export const addContactInfoAction = (contactInfo) => ({
    type: ticketActionTypes.ADD_CONTACT_INFO,
    payload: contactInfo
});

export const makePaymentAction = (data) => {
    const { tripId, selectedSeats } = data;
    return (dispatch) => {
        dispatch({ type: ticketActionTypes.MAKE_PAYMENT_START });
        apiCall({
            url: `/ticket/payment`,
            method: 'POST',
            data: data
        })
        .then(response => {
            dispatch({ type: ticketActionTypes.MAKE_PAYMENT_SUCCESS, payload: response?.data });
            dispatch(updateSeatsAction({selectedSeats, tripId}));
            dispatch(clearSearchTripsAction());
        })
        .catch(error => {
            console.log("[ERROR]",error?.response?.data?.message);
            dispatch({ type: ticketActionTypes.MAKE_PAYMENT_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const checkCompleteTokenAction = (token) => {
    return (dispatch) => {
        dispatch({ type: ticketActionTypes.CHECK_COMPLETE_TOKEN_START });
        apiCall({
            method: 'POST',
            url: `/ticket/check-token`,
            data: {token}
        })
        .then(response => {
            console.log(response?.data);
            dispatch({ type: ticketActionTypes.CHECK_COMPLETE_TOKEN_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            console.log(error?.response?.data?.message)
            dispatch({ type: ticketActionTypes.CHECK_COMPLETE_TOKEN_FAILURE, payload: error?.response?.data?.message });
        })
    }
}

export const findTicketAction = (data) => {
    return (dispatch) => {
        dispatch({ type: ticketActionTypes.FIND_TICKET_START });
        apiCall({
            method: 'post',
            url: `/ticket/find-ticket`,
            data: data
        })
        .then(response => {
            console.log(response?.data);
            dispatch({ type: ticketActionTypes.FIND_TICKET_SUCCESS, payload: response?.data });
        })
        .catch(error => {
            console.log(error?.response?.data?.message);
            dispatch({ type: ticketActionTypes.FIND_TICKET_FAILURE, payload: error?.response?.data?.message });
        })
    }
}