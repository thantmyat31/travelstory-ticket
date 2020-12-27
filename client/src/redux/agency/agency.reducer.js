import { agencyActionTypes } from './agency.type';
import { userActionTypes } from './../user/user.type';

const INITIAL_STATE = {
    express_agencies: [],
    express_agency: undefined,
    sold_tickets_by_tripId: [],
    loading: false,
    error: null
}

const agencyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userActionTypes.USER_LOGOUT_ACTION:
            return {
                ...state,
                express_agencies: [],
                express_agency: undefined,
                loading: false,
                error: null
            }

        case agencyActionTypes.CREATE_EXPRESS_AGENCY_START:
        case agencyActionTypes.GET_OWN_EXPRESS_AGENCY_START:
        case agencyActionTypes.GET_ALL_EXPRESS_AGENCY_START:
        case agencyActionTypes.CHECK_SOLD_TICKETS_START:
            return {
                ...state,
                loading: true
            }

        case agencyActionTypes.CREATE_EXPRESS_AGENCY_FAILURE:
        case agencyActionTypes.GET_ALL_EXPRESS_AGENCY_FAILURE:
        case agencyActionTypes.CHECK_SOLD_TICKETS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case agencyActionTypes.GET_OWN_EXPRESS_AGENCY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                express_agency: undefined
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

        case agencyActionTypes.GET_ALL_EXPRESS_AGENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                express_agencies: action.payload
            }

        case agencyActionTypes.CHECK_SOLD_TICKETS_SUCCESS:
            return {
                ...state,
                loading: false,
                sold_tickets_by_tripId: action.payload
            }

        case agencyActionTypes.RESET_SOLD_TICKETS_IN_AGENCY_PANEL:
            return {
                ...state,
                sold_tickets_by_tripId: []
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

export default agencyReducer;