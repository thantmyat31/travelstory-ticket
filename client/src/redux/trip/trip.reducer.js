import { tripActionTypes } from './trip.type';
import { searchTrips } from './../../utils/trip.utils';
import { dateTimeDifferences } from '../../utils/dateTime.utils';

const INITIAL_STATE = {
    trips: [],
    tripsByAgency: [],
    tripById: undefined,
    searchResult: undefined,
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
                trips: dateTimeDifferences(action.payload)
            }

        case tripActionTypes.GET_TRIPS_BY_AGENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tripsByAgency: dateTimeDifferences(action.payload)
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

        case tripActionTypes.SEARCH_TRIPS:
            return {
                ...state,
                loading: false,
                error: null,
                searchResult: searchTrips({ data: action.payload, trips: state.trips })
            }

        case tripActionTypes.CLEAR_SEARCH_TRIPS:
            return {
                ...state,
                searchResult: undefined
            }

        default:
            return state;
    }
}

export default tripReducer;