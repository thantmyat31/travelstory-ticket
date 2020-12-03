import { adminActionTypes } from './admin.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

export const getAllUsersAction = (token) => {
    return (dispatch) => {
        dispatch({ type: adminActionTypes.GET_ALL_USER_START });
        apiCall({
            method: 'GET',
            url: '/user/all',
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({ type: adminActionTypes.GET_ALL_USER_SUCCESS, payload: response?.data })
        })
        .catch(error => {
            dispatch({ type: adminActionTypes.GET_ALL_USER_FAILURE, payload: error?.response?.data?.message })
        })
    }
}
