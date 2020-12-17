import { tripActionTypes } from './trip.type';

const INITIAL_STATE = {
    trips: [],
    tripsByAgency: [],
    tripById: undefined,
    loading: false,
    error: null
}

const tripReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case tripActionTypes.GET_ALL_TRIPS_START:
        case tripActionTypes.GET_TRIPS_BY_AGENCY_START:
        case tripActionTypes.TRIP_CREATE_START:
        case tripActionTypes.TRIP_DELETE_START:
        case tripActionTypes.UPDATE_SEATS_START:
            return {
                ...state,
                loading: true
            }

        case tripActionTypes.GET_ALL_TRIPS_FAILURE:
        case tripActionTypes.GET_TRIPS_BY_AGENCY_FAILURE:
        case tripActionTypes.TRIP_CREATE_FAILURE:
        case tripActionTypes.TRIP_DELETE_FAILURE:
        case tripActionTypes.UPDATE_SEATS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case tripActionTypes.GET_ALL_TRIPS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                trips: action.payload
            }

        case tripActionTypes.GET_TRIPS_BY_AGENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tripsByAgency: action.payload
            }

        case tripActionTypes.TRIP_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                trips: [...state.trips, action.payload]
            }

        case tripActionTypes.GET_TRIP_BY_ID:
            return {
                ...state,
                tripById: state.trips.find(trip => trip._id === action.payload)
            }

        case tripActionTypes.UPDATE_SEATS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                trips: state.trips.map(t => t._id === action.payload._id ? { ...t, seatsList: action.payload.seatsList } : t),
                tripsByAgency: state.tripsByAgency.map(t => t._id === action.payload._id ? { ...t, seatsList: action.payload.seatsList } : t),
                tripById: action.payload
            }

        case tripActionTypes.TRIP_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                trips: state.trips.filter(t => t._id !== action.payload._id),
                tripsByAgency: state.tripsByAgency.filter(t => t._id !== action.payload._id)
            }

        default:
            return state;
    }
}

export default tripReducer;