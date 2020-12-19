import { ticketActionTypes } from './ticket.type';

export const selectSeatAction = ({selectedSeats, tripId}) => ({
    type: ticketActionTypes.SELECT_SEATS,
    payload: { selectedSeats, tripId}
});