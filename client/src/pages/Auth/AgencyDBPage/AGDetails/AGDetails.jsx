import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOwnAgencyAction } from '../../../../redux/agency/agency.action';
import { getTripsByAgencyAction } from '../../../../redux/trip/trip.action';
import { errorReset } from './../../../../redux/user/user.action';

import styles from './AGDetails.module.css';
import CardRow from './../../../../components/CardRow/CardRow';

const AGDetails = () => {
    const { user, token } = useSelector(state => state.user);
    const { express_agency, error } = useSelector(state => state.agency);
    const { tripsByAgency } = useSelector(state => state.trip);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errorReset());
    }, [dispatch, error]);

    useEffect(() => {
        dispatch(getOwnAgencyAction({ id: user._id, token }))
    }, [dispatch, user, token]);

    useEffect(() => {
        if(token) dispatch(getTripsByAgencyAction({ agencyId: express_agency._id, token }));
    }, [dispatch, token, express_agency]);

    console.log(tripsByAgency)

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
            <div className={styles.container}>
            {
                tripsByAgency && tripsByAgency.map((trip, index) => (
                    <CardRow key={index}>
                        <div>
                            <h3>{trip.depart.time} {trip.busType}</h3>
                            <p>{trip.tripName}</p>
                            <p>Departs: {trip.depart.date}, {trip.depart.time} PM Afternoon</p>
                            <p>Arrives: {trip.arrive.date}, {trip.arrive.time} AM   Duration: 15 Hours</p>
                        </div>
                        <div>
                            <img width="100%" src={`${process.env.REACT_APP_IMAGE}/${trip.agency.image}`} />
                        </div>
                    </CardRow>
                ))
            }
            </div>
        </>
     );
}
 
export default AGDetails;