import { agencyActionTypes } from './agency.type';
import axios from 'axios';

const apiCall = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

export const createExpressAgencyAction = ({ data, token }) => {
    return (dispatch) => {
        dispatch({ type: agencyActionTypes.CREATE_EXPRESS_AGENCY_START });

        const createAgency = (filePath = '') => {
            const createData = {
                owner: data.userId,
                name: data.name,
                email: data.email,
                phones: data.phones,
                addresses: data.addresses, 
                image: filePath
            }
            apiCall({
                method: 'POST',
                url: '/agency/create',
                headers: {
                    'x-auth-token': token
                },
                data: createData
            })
            .then(response => {
                dispatch({ type: agencyActionTypes.CREATE_EXPRESS_AGENCY_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: agencyActionTypes.CREATE_EXPRESS_AGENCY_FAILURE, payload: error?.response?.data?.message });
            })
        }
        if(data.file) {
            const formData = new FormData();
            formData.append('file', data.file);
            apiCall({
                method: 'POST',
                url:'/agency/upload',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                }
            })
            .then(response => {
                if(response?.data?.success) {
                    createAgency(response.data.filePath);
                }
            })
            .catch(error => {
                dispatch({ type: agencyActionTypes.CREATE_EXPRESS_AGENCY_FAILURE, payload: 'Failed to upload image' });
            })
        } else {
            createAgency();
        }
    }
}

export const getOwnAgencyAction = ({ id, token }) => {
    return (dispatch) => {
        dispatch({ type: agencyActionTypes.GET_OWN_EXPRESS_AGENCY_START });
        apiCall({
            method: 'GET',
            url: `/agency/${id}`,
            headers: {
                'x-auth-token': token
            },
        })
        .then(response => {
            dispatch({ type: agencyActionTypes.GET_OWN_EXPRESS_AGENCY_SUCCESS, payload: response.data });
        })
        .catch(error => {   
            dispatch({ type: agencyActionTypes.GET_OWN_EXPRESS_AGENCY_FAILURE, payload: error?.response?.data?.message });
        })
    }
}