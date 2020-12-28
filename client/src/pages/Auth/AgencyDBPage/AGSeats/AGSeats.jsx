import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTripById } from '../../../../redux/trip/trip.action';
import { resetSoldTicketsInAgencyPanelAction } from './../../../../redux/agency/agency.action';
import { checkSoldTicketsAction } from '../../../../redux/agency/agency.action';
import { updateSeatsAction } from './../../../../redux/trip/trip.action';

import Button from '../../../../components/Button/Button';
import Title from './../../../../components/Title/Title';
import PrintableTable from './../../../../components/PrintableTable/PrintableTable';

import styles from './AGSeats.module.css';
import cx from 'classnames';
import { filterSeatsAsAlphabat } from './../../../../utils/seats.utils';
import { BsFillLockFill } from 'react-icons/bs';

const AGSeats = ({ match }) => {
    const tripId = match.params.tripId;
    const { tripById } = useSelector(state => state.trip);
    const { user, token } = useSelector(state => state.user);
    const { sold_tickets_by_tripId } = useSelector(state => state.agency);

    const [ selectedSeats, setSelectedSeats ] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetSoldTicketsInAgencyPanelAction());
    }, [dispatch]);

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

    const renderSeatsColByAlphabet = (seats) => {
        return (
            <div className={styles.seats__col}>
                {seats?.map((seat, index) => (
                    <div 
                        key={index}
                        className={inArray(seat)} 
                        onClick={() => selectSeatValidationHandler(seat)}>
                        {seat.isValid?seat.number:<BsFillLockFill />}
                    </div>
                ))}
            </div>
        )
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

    const handleOnCheckSoldTickets = () => {
        if(tripId && token) dispatch(checkSoldTicketsAction({ tripId, token }));
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
                    {renderSeatsColByAlphabet(filteredSeats?.seatsA)}
                    {renderSeatsColByAlphabet(filteredSeats?.seatsB)}
                    {renderSeatsColByAlphabet(filteredSeats?.seatsC)}
                    {renderSeatsColByAlphabet(filteredSeats?.seatsD)}
                </div>
                <div  className={cx(styles.seats__row, styles.button)}>
                    <Button title="Check Sold Tickets" onClick={handleOnCheckSoldTickets} btnColor="light" style={{ marginTop:'10px' }} />
                    <Button title="Update Seats Plan" onClick={handleOnSubmit} style={{ marginTop:'10px' }} />
                </div>
            </div>
        
            {sold_tickets_by_tripId.length?
                <>
                    <Title title="Sold Tickets" count={sold_tickets_by_tripId.length} />
                    <div className={styles.sold__tickets}>
                    {sold_tickets_by_tripId.map((ticket, index) => (
                        <PrintableTable key={index} ticket={ticket} style={{ marginBottom:'20px' }} />
                    ))}
                    </div>
                </>
            : null}
        </div>
     );
}
 
export default AGSeats;