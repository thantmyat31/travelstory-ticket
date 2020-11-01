import { userActionTypes } from './user.type';

export const saveUserInState = (token, user) => ({
    type: userActionTypes.SAVE_USER_IN_STATE,
    payload: { token, user }
});

export const userLogout = () => ({
    type: userActionTypes.USER_LOGOUT
});