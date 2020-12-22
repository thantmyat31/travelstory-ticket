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