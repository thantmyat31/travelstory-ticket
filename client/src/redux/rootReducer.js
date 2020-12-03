import { combineReducers } from 'redux';
import adminReducer from './admin/admin.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer
});

export default rootReducer;