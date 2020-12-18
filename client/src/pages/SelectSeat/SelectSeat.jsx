import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTripById } from '../../redux/trip/trip.action';

import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';

import styles from './SelectSeat.module.css';
import cx from 'classnames';
import { filterSeatsAsAlphabat } from './../../utils/seats.utils';
import { BsFillLockFill } from 'react-icons/bs';
import Layout from '../../components/Layout/Layout';
// import { updateSeatsAction } from './../../redux/trip/trip.action';
import { getDateTimeString } from './../../utils/dateTime.utils';

const SelectSeat = ({ match }) => {
    const tripId = match.params.tripId;
    const { tripById } = useSelector(state => state.trip);
    const [ selectedSeats, setSelectedSeats ] = useState([]);
    const dispatch = useDispatch();

    console.log(tripById);

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
        if(seat.isValid) handleOnSelectSeat(seat);
        else return;
    }

    const handleOnSubmit = () => {
        if(selectedSeats && tripId) {
            // dispatch(updateSeatsAction({selectedSeats, tripId }));
            setSelectedSeats([]);
        }
        else return;
    }

    if(!tripById) return (
        <div>
            Loading...
        </div>
    )
    
    return ( 
        <Layout>
            <div className="page">
                <div className={styles.page__row}>
                    <div className={styles.seats__container}>
                        <Title title="Select 1 seat" style={{ marginTop:'0px', textTransform: 'initial' }} />
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
                        </div>
                    </div>
                    
                    <div className={styles.seats__rtSidebar}>
                        <Title title="Trip information" style={{ marginTop:'0px', textTransform: 'initial' }} />
                        <div className={styles.trip__info}>
                            <table className={styles.table}>
                                <tbody>
                                    <tr>
                                        <td className={styles.menu}>Operator</td>
                                        <td>{tripById?.agency?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.menu}>Route</td>
                                        <td className={styles.trip__name}>{tripById?.tripName}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.menu}>Departure time</td>
                                        <td>{getDateTimeString({date: tripById?.depart?.date, time: tripById?.depart?.time})}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.menu}>Arrival time</td>
                                        <td>{getDateTimeString({date: tripById?.arrive?.date, time: tripById?.arrive?.time})}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.menu}>Subtotal</td>
                                        <td>{tripById?.price} MMK</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div  className={cx(styles.seats__row, styles.button)}>
                                <Button title="Update Seats Plan" onClick={handleOnSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default SelectSeat;