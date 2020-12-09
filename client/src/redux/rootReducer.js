import { combineReducers } from 'redux';
import adminReducer from './admin/admin.reducer';
import agencyReducer from './agency/agency.reducer';
import cityReducer from './city/city.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    agency: agencyReducer,
    city: cityReducer
});

export default rootReducer;