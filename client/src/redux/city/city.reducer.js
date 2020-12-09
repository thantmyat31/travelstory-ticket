import { cityActionTypes } from './city.type';

const INITIAL_STATE = {
    cities: [],
    loading: false,
    error: null
}

const cityReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case cityActionTypes.GET_ALL_CITIES_START:
        case cityActionTypes.ADD_CITY_START:
        case cityActionTypes.DELETE_CITY_START:
            return {
                ...state,
                loading: true,
            }

        case cityActionTypes.GET_ALL_CITIES_FAILURE:
        case cityActionTypes.ADD_CITY_FAILURE:
        case cityActionTypes.DELETE_CITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case cityActionTypes.GET_ALL_CITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                cities: action.payload
            }

        case cityActionTypes.ADD_CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                cities: [...state.cities, action.payload]
            }

        case cityActionTypes.DELETE_CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                cities: state.cities.filter(city => city._id !== action.payload._id)
            }

        default:
            return state;
    }
}

export default cityReducer;