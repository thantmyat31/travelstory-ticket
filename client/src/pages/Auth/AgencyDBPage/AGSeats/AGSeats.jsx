import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTripById } from '../../../../redux/trip/trip.action';

import Button from '../../../../components/Button/Button';
import Title from './../../../../components/Title/Title';

import styles from './AGSeats.module.css';
import cx from 'classnames';
import { filterSeatsAsAlphabat } from './../../../../utils/seats.utils';
import { BsFillLockFill } from 'react-icons/bs';
import { updateSeatsAction } from './../../../../redux/trip/trip.action';

const AGSeats = ({ match }) => {
    const tripId = match.params.tripId;
    const { tripById } = useSelector(state => state.trip);
    const { user } = useSelector(state => state.user);
    const [ selectedSeats, setSelectedSeats ] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(tripId) dispatch(getTripById(tripId));
    }, [dispatch, tripId]);

    const filteredSeats = filterSeatsAsAlphabat(tripById?.seatsList);

    const inArray = (seat) => {
        const selected = selectedSeats.find(s => s === seat.number);
        if(selected) return cx(styles.seat, styles.active);
        else {
            if(seat.isValid) return styles.seat;
            else return cx(styles.seat, styles.locked);
        };
    }

    const handleOnSelectSeat = (seat) => {
        const selected = selectedSeats.find(s => s === seat.number);
        if(!selected) setSelectedSeats([...selectedSeats, seat.number]);
        else setSelectedSeats(selectedSeats.filter(s => s !== seat.number));
    }

    const selectSeatValidationHandler = (seat) => {
        if(user && user?.role === 'agency') {
            handleOnSelectSeat(seat);
        } else {
            if(seat.isValid) handleOnSelectSeat(seat);
            else return;
        }
    }

    const handleOnSubmit = () => {
        if(selectedSeats && tripId) {
            dispatch(updateSeatsAction({selectedSeats, tripId }));
            setSelectedSeats([]);
        }
        else return;
    }
    
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
                        filteredSeats?.seatsA?.map((seat, index) => (
                            <div 
                                key={index}
                                className={inArray(seat)} 
                                onClick={() => selectSeatValidationHandler(seat)}>
                                {seat.isValid?seat.number:<BsFillLockFill />}
                            </div>
                        ))
                    }
                    </div>
                    <div className={styles.seats__col}>
                    {
                        filteredSeats?.seatsB?.map((seat, index) => (
                            <div 
                                key={index}
                                className={inArray(seat)} 
                                onClick={() => selectSeatValidationHandler(seat)}>
                                {seat.isValid?seat.number:<BsFillLockFill />}
                            </div>
                        ))
                    }
                    </div>
                    <div className={styles.seats__col}>
                    {
                        filteredSeats?.seatsC?.map((seat, index) => (
                            <div 
                                key={index}
                                className={inArray(seat)} 
                                onClick={() => selectSeatValidationHandler(seat)}>
                                {seat.isValid?seat.number:<BsFillLockFill />}
                            </div>
                        ))
                    }
                    </div>
                    <div className={styles.seats__col}>
                    {
                        filteredSeats?.seatsD?.map((seat, index) => (
                            <div 
                                key={index}
                                className={inArray(seat)} 
                                onClick={() => selectSeatValidationHandler(seat)}>
                                {seat.isValid?seat.number:<BsFillLockFill />}
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div  className={cx(styles.seats__row, styles.button)}>
                    <Button title="Update Seats Plan" onClick={handleOnSubmit} />
                </div>
            </div>
        </div>
     );
}
 
export default AGSeats;