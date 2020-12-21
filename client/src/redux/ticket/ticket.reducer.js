import { ticketActionTypes } from './ticket.type';
import { tripActionTypes } from './../trip/trip.type';


const INITIAL_STATE = {
    numberOfTickets: 0,
    nationality: 'myanmar',
    selectedSeats: [],
    tripId: undefined,
    contactInfo: undefined,
    error: null
}

const ticketReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case tripActionTypes.SEARCH_TRIPS:
            return {
                ...state,
                numberOfTickets: action?.payload?.numberOfSeat,
                nationality: action?.payload?.nationality
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

        case tripActionTypes.CLEAR_SEARCH_TRIPS:
            return {
                ...state,
                numberOfTickets: 0,
                nationality: 'myanmar',
                selectedSeats: [],
                tripId: undefined,
                contactInfo: undefined,
                error: null
            }

        

        default:
            return state;
    }
}

export default ticketReducer;