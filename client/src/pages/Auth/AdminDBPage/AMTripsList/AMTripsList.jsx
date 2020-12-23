import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import Trip from './../../../../components/Trip/Trip';
import styles from './AMTripsList.module.css';

const AMTripsList = () => {
    const [ selectedTrips, setSelectedTrips ] = useState([]);
    const [ selectedAgency, setSelectedAgency ] = useState('');
    const { trips } = useSelector(state => state.trip);
    const { express_agencies } = useSelector(state => state.agency);

    useEffect(() => {
        if(trips) {
            if(selectedAgency === '') setSelectedTrips(trips);
            else {
                const result = trips.filter(t => t.agency._id === selectedAgency);
                setSelectedTrips(result);
            }
        }
    }, [selectedAgency, trips]);

    const renderTripsCard = (trips) => {
        return (
            trips.map((trip, index) => <Trip key={index} trip={trip} isAdmin={true} />)
        );
    }

    const renderTripsOption = (agencies) => {
        return (
            agencies.map((agency, index) => <option key={index} value={agency._id}>{agency.name}</option>)
        )
    }

    return ( 
        <>
            <select className={styles.select} onChange={(e) => setSelectedAgency(e.target.value)}>
                <option value="">All</option>
                {renderTripsOption(express_agencies)}
            </select>
            {renderTripsCard(selectedTrips)}
        </>
     );
}
 
export default AMTripsList;