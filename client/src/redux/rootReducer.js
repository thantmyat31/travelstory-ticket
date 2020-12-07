import { combineReducers } from 'redux';
import adminReducer from './admin/admin.reducer';
import agencyReducer from './agency/agency.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    agency: agencyReducer
});

export default rootReducer;