import { exchangeActionTypes } from "./exchange.type"

const INITIAL_STATE = {
    exchangeRate: undefined,
    loading: false,
    error: null
}

const exchangeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case exchangeActionTypes.CREATE_EXCHANGE_RATE_START:
        case exchangeActionTypes.UPDATE_EXCHANGE_RATE_START:
        case exchangeActionTypes.GET_EXCHANGE_RATE_START:
            return {
                ...state,
                loading: true
            }

        case exchangeActionTypes.CREATE_EXCHANGE_RATE_FAILURE:
        case exchangeActionTypes.UPDATE_EXCHANGE_RATE_FAILURE:
        case exchangeActionTypes.GET_EXCHANGE_RATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case exchangeActionTypes.CREATE_EXCHANGE_RATE_SUCCESS:
        case exchangeActionTypes.UPDATE_EXCHANGE_RATE_SUCCESS:
        case exchangeActionTypes.GET_EXCHANGE_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                exchangeRate: action.payload
            }

        default:
            return state;
    }
}

export default exchangeReducer;