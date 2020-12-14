import { combineReducers } from 'redux';
import adminReducer from './admin/admin.reducer';
import agencyReducer from './agency/agency.reducer';
import cityReducer from './city/city.reducer';
import userReducer from './user/user.reducer';
import tripReducer from './trip/trip.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    agency: agencyReducer,
    city: cityReducer,
    trip: tripReducer
});

export default rootReducer;