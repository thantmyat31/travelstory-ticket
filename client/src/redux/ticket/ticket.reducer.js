import { ticketActionTypes } from './ticket.type';
import { tripActionTypes } from './../trip/trip.type';
import { userActionTypes } from './../user/user.type';


const INITIAL_STATE = {
    numberOfTickets: 0,
    nationality: 'myanmar',
    selectedSeats: [],
    tripId: undefined,
    contactInfo: undefined,
    boughtTicketInfo: undefined,
    loading: false,
    error: null
}

const ticketReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ticketActionTypes.MAKE_PAYMENT_START:
            return {
                ...state,
                loading: true
            }

        case ticketActionTypes.MAKE_PAYMENT_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case ticketActionTypes.MAKE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                boughtTicketInfo: action.payload
            }

        case ticketActionTypes.SELECT_SEATS:
            return {
                ...state,
                selectedSeats: action.payload?.selectedSeats,
                tripId: action.payload?.tripId
            }
        
        case ticketActionTypes.ADD_CONTACT_INFO:
            return {
                ...state,
                contactInfo: action.payload
            }

        case tripActionTypes.SEARCH_TRIPS:
            return {
                ...state,
                numberOfTickets: action?.payload?.numberOfSeat,
                nationality: action?.payload?.nationality
            }

        case tripActionTypes.CLEAR_SEARCH_TRIPS:
            return {
                ...state,
                numberOfTickets: 0,
                nationality: 'myanmar',
                selectedSeats: [],
                tripId: undefined,
                contactInfo: undefined,
                boughtTicketInfo: undefined,
                loading: false,
                error: null
            }

        case userActionTypes.ERROR_RESET:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state;
    }
}

export default ticketReducer;