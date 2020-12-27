import React, {useState} from 'react';
import CardRow from './../CardRow/CardRow';
import Button from '../Button/Button';

import styles from './Trip.module.css';
import { getDateTimeString, getDuration, getTime } from './../../utils/dateTime.utils';
import cx from 'classnames';
import Popup from './../Popup/Popup';
import { useLocation } from 'react-router-dom';
import { getValidSeats } from '../../utils/seats.utils';

const Trip = ({ trip, onClick, onDelete, onSelectSeat, style, isAdmin }) => {
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const location = useLocation();

    const handleOnDelete = () => {
        onDelete();
        setIsPopupOpen(false);
    }
    
    return (
        <>
            <CardRow style={style}>
                <div className={styles.container}>
                    <h3>{getTime(trip.depart.time)} - {trip.busType}</h3>
                    <p>{trip.tripName}</p>
                    <span>
                        <small>Departs: {getDateTimeString({ date: trip.depart.date, time: trip.depart.time})}</small>
                    </span>
                    <br />
                    <span>
                        <small>Arrives: {getDateTimeString({ date: trip.arrive.date, time: trip.arrive.time })}</small>
                    </span>
                    <br />
                    <span>
                        <small>Duration: {getDuration({ depart: trip.depart, arrive: trip.arrive })}</small>
                    </span>
                </div>
                <div className={cx(styles.container, styles.middle)}>        
                    <img src={`${process.env.REACT_APP_IMAGE}/${trip.agency.image}`} alt="brand logo" />
                </div>
                <div className={cx(styles.container, styles.last)}>
                    <h4>{trip.price} MMK</h4>
                    {isAdmin ? 
                        (
                            <>
                                <h5>{trip.agency.name}</h5>
                                <span className={styles.valid__seats}>Valid seats <b>{getValidSeats([trip])}</b></span>
                            </>
                        )
                        :(
                            location.pathname === '/auth/agency' ?
                            <>
                                <Button title="Details" onClick={onClick} style={{ padding:'10px', marginTop: '10px', width: '125px' }} />
                                <Button title="Delete Trip" btnColor="danger" onClick={() => setIsPopupOpen(true)} style={{ padding: '10px', margin: '10px 0', width: '125px' }} />
                                <span className={styles.valid__seats}>Valid seats <b>{getValidSeats([trip])}</b></span>
                            </> :
                            <>
                                <Button title="Select Seats" onClick={onSelectSeat} style={{ padding:'10px', marginTop: '10px', width: '125px' }} />
                            </>
                        )
                    }
                    
                </div>
            </CardRow>
            {isPopupOpen ? 
                <Popup title="Are you sure to delete this trip?">
                    <Button title="Cancel" onClick={() => setIsPopupOpen(false)} style={{ padding:'10px', marginTop: '10px', width: '125px' }} />
                    <Button title="Delete" btnColor="danger" onClick={handleOnDelete} style={{ padding: '10px', marginTop: '10px', marginLeft: '10px', width: '125px' }} />
                </Popup>: 
            null}
        </>
    )
}
 
export default Trip;