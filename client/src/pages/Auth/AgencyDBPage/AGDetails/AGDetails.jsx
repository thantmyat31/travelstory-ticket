import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOwnAgencyAction, resetError } from '../../../../redux/agency/agency.action';

import styles from './AGDetails.module.css';

const AGDetails = () => {
    const { user, token } = useSelector(state => state.user);
    const { express_agency, error } = useSelector(state => state.agency);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch, error]);

    useEffect(() => {
        dispatch(getOwnAgencyAction({ id: user._id, token }))
    }, [dispatch, user, token]);

    return ( 
        <>
            {
                express_agency ?
                <div className={styles.container}>
                    <div>
                        <img src={`${process.env.REACT_APP_IMAGE}/${express_agency.image}`} alt="Agency Logo" />
                    </div>
                    <div className={styles.details}>
                        <span>
                            <h3>{express_agency.name}</h3>
                        </span>
                        <span>
                            <p><b>Email</b> : <small>{express_agency.email}</small></p>
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
                </div> : null
            }
        </>
     );
}
 
export default AGDetails;