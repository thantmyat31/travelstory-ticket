import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOwnAgencyAction } from '../../../../redux/agency/agency.action';
import { getTripsByAgencyAction, tripDeleteAction } from '../../../../redux/trip/trip.action';
import { errorReset } from './../../../../redux/user/user.action';

import ExpressAgencyInfoCard from '../../../../components/ExpressAgencyInfoCard/ExpressAgencyInfoCard';
import Trip from '../../../../components/Trip/Trip';
import styles from './AGDetails.module.css';


const AGDetails = ({ history }) => {
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
        if(token && express_agency) dispatch(getTripsByAgencyAction({ agencyId: express_agency?._id, token }));
    }, [dispatch, token, express_agency]);

    const handleOnDelete = (tripId) => {
        if(tripId && token) dispatch(tripDeleteAction({tripId, token}));
        else return;
    }

    if(!express_agency) return (
        <div>
            <h2>No express agency you have added.</h2>
            <p>Please add an express agency before creating trips.</p>
        </div>
    );

    return (
        <>
            <ExpressAgencyInfoCard agency={express_agency} />
            <div className={styles.container}>
            {
                tripsByAgency && tripsByAgency.map((trip, index) => <Trip 
                    key={index} 
                    trip={trip}
                    onClick={() => history.push(`/auth/agency/seats-plan/${trip._id}`)}
                    onDelete={() => handleOnDelete(trip._id)}
                    style={{ width:'100%' }}
                />)    
            }
            </div>
        </>
     );
}
 
export default AGDetails;