import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOwnAgencyAction } from '../../../../redux/agency/agency.action';
import { errorReset } from './../../../../redux/user/user.action';

import styles from './AGDetails.module.css';

const AGDetails = () => {
    const { user, token } = useSelector(state => state.user);
    const { express_agency, error } = useSelector(state => state.agency);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errorReset());
    }, [dispatch, error]);

    useEffect(() => {
        dispatch(getOwnAgencyAction({ id: user._id, token }))
    }, [dispatch, user, token]);

    if(!express_agency) return (
        <div>
            <h2>No express agency you have added.</h2>
            <p>Please add an express agency before creating trips.</p>
        </div>
    );

    return ( 
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={`${process.env.REACT_APP_IMAGE}/${express_agency.image}`} alt="Agency Logo" />
                </div>
                <div className={styles.details}>
                    <span>
                        <h3>{express_agency.name}</h3>
                    </span>
                    <span>
                        <h4>Email</h4>
                        <small>{express_agency.email}</small>
                    </span>
                    <span>
                        <h4>Phone</h4>
                        {express_agency.phones.map((phone, index) => <p key={index}>{phone.location} - {phone.number}</p>)}
                    </span>
                    <span>
                        <h4>Address</h4>
                        {express_agency.addresses.map((address, index) => <p key={index}>{address.location} - {address.address}</p>)}
                    </span>
                </div>
            </div>
        </>
     );
}
 
export default AGDetails;