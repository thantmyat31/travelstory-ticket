import { agencyActionTypes } from './agency.type';

const INITIAL_STATE = {
    express_agency: {},
    loading: false,
    error: null
}

const agencyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case agencyActionTypes.CREATE_EXPRESS_AGENCY_START:
        case agencyActionTypes.GET_OWN_EXPRESS_AGENCY_START:
            return {
                ...state,
                loading: true
            }

        case agencyActionTypes.CREATE_EXPRESS_AGENCY_FAILURE:
        case agencyActionTypes.GET_OWN_EXPRESS_AGENCY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case agencyActionTypes.CREATE_EXPRESS_AGENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                express_agency: action.payload
            }
        
        case agencyActionTypes.GET_OWN_EXPRESS_AGENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                express_agency: action.payload
            }

        case agencyActionTypes.RESET_ERROR:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state;
    }
}

export default agencyReducer;