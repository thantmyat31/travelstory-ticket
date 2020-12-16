import React, { useEffect } from 'react';
import styles from './AGSeats.module.css';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTripById } from '../../../../redux/trip/trip.action';
import { filterSeatsAsAlphabat } from './../../../../utils/seats.utils';
import Seat from '../../../../components/Seat/Seat';
import Title from './../../../../components/Title/Title';

const AGSeats = ({ match }) => {
    const tripId = match.params.tripId;
    const { tripById } = useSelector(state => state.trip);
    const dispatch = useDispatch();
    useEffect(() => {
        if(tripId) dispatch(getTripById(tripId));
    }, [dispatch, tripId]);

    const filteredSeats = filterSeatsAsAlphabat(tripById?.seatsList);
    
    return ( 
        <div className={styles.container}>
            <Title title={tripById?.busNumber} />
            <div className={styles.seats__plan}>
                <div className={cx(styles.seats__row, styles.driver__row)}>
                    <div className={cx(styles.seats__col, styles.driver__col)}>
                        <span className={styles.driver__span}>Driver</span>
                    </div>
                </div>
                <div className={styles.seats__row}>
                    <div className={styles.seats__col}>
                    {
                        filteredSeats?.seatsA?.map((seat, index) => <Seat key={index} number={seat.number} />)
                    }
                    </div>
                    <div className={styles.seats__col}>
                    {
                        filteredSeats?.seatsB?.map((seat, index) => <Seat key={index} number={seat.number} />)
                    }
                    </div>
                    <div className={styles.seats__col}>
                    {
                        filteredSeats?.seatsC?.map((seat, index) => <Seat key={index} number={seat.number} />)
                    }
                    </div>
                    <div className={styles.seats__col}>
                    {
                        filteredSeats?.seatsD?.map((seat, index) => <Seat key={index} number={seat.number} />)
                    }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AGSeats;