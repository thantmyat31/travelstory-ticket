import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPeopleFill, BsBuilding, BsBriefcaseFill } from 'react-icons/bs';
import { FaExchangeAlt, FaBus } from 'react-icons/fa';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { getAllUsersAction } from './../../../../redux/admin/admin.action';
import { getAllCitiesAction } from './../../../../redux/city/city.action';
import { getExchangeRateAction } from './../../../../redux/exchange/exchange.action';
import { getAllAgenciesAction } from './../../../../redux/agency/agency.action';
import { getAllTripsAction } from './../../../../redux/trip/trip.action';

import { getValidSeats } from '../../../../utils/seats.utils';
import styles from './AMDetails.module.css';
import cx from 'classnames';

const AMDetails = () => {
    const { users } = useSelector(state => state.admin);
    const { token } = useSelector(state => state.user);
    const { cities } = useSelector(state => state.city);
    const { express_agencies } = useSelector(state => state.agency);
    const { exchangeRate } = useSelector(state => state.exchange);
    const { trips } = useSelector(state => state.trip);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExchangeRateAction());
        dispatch(getAllCitiesAction());
        dispatch(getAllTripsAction());
        if(token) {
            dispatch(getAllUsersAction(token));
            dispatch(getAllAgenciesAction(token));
        }
    }, [dispatch, token]);

    return ( 
        <>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <BsPeopleFill className={styles.icon} />
                            <h3>Users</h3>
                            <span>{users?.length}</span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <BsBuilding className={styles.icon} />
                            <h3>Cities</h3>
                            <span>{cities?.length}</span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.card}>
                            <FaExchangeAlt className={styles.icon} />
                            <h3>$ Exchange Rate</h3>
                            <span>{exchangeRate?.dollarXR} MMK</span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={cx(styles.card, styles.danger)}>
                            <BsBriefcaseFill className={styles.icon} />
                            <h3>Agencies</h3>
                            <span>{express_agencies?.length}</span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={cx(styles.card, styles.danger)}>
                            <FaBus className={styles.icon} />
                            <h3>Valid Trips</h3>
                            <span>{trips?.length}</span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={cx(styles.card, styles.danger)}>
                            <MdAirlineSeatReclineNormal className={styles.icon} />
                            <h3>Valid Seats</h3>
                            <span>{getValidSeats(trips)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default AMDetails;