import React from 'react';
import CardRow from './../CardRow/CardRow';
import Button from '../Button/Button';

import styles from './TripsList.module.css';
import { getDateTimeString, getDuration, getTime } from './../../utils/dateTime.utils';
import cx from 'classnames';

const TripsList = ({ tripsList, onClick }) => {

    return ( 
        <>
        {
            tripsList && tripsList.map((trip, index) => (
                <CardRow key={index} style={{ width:'100%' }}>
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
                        <Button title="Select Seats" onClick={onClick} style={{ padding:'10px', marginTop: '10px' }} />
                    </div>
                </CardRow>
            ))
        }
        </>
     );
}
 
export default TripsList;