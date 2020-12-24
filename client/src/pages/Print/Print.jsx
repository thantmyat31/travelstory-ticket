import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findTicketAction } from '../../redux/ticket/ticket.action';

import Layout from '../../components/Layout/Layout';
import Button from '../../components/Button/Button';
import Title from './../../components/Title/Title';
import Input from './../../components/Input/Input';
import CitiesSelector from './../../components/CitiesSelector/CitiesSelector';

import styles from './Print.module.css';
import cx from 'classnames';
import { getDate, maxDateForCalendar } from './../../utils/dateTime.utils';
import { ToastContainer, toast } from 'react-toastify';
import { errorReset } from './../../redux/user/user.action';

const Print = () => {
    const [cityFrom, setCityFrom] = useState('');
    const [cityTo, setCityTo] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [phone, setPhone] = useState('');
    const maxDate = maxDateForCalendar();
    const { ticket, error } = useSelector(state => state.ticket);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errorReset());
    }, []);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(cityFrom === '' || cityTo === '' || departDate === '' || phone === '') return toast.error('Please enter all required field with red astris.');

        else dispatch(findTicketAction({cityFrom, cityTo, departDate, phone}));
    }

    return ( 
        <Layout>
            <ToastContainer />
            <div className="page">
                <div className={styles.row}>
                    <div className={cx(styles.col, styles.lf__col)}>
                        <Title title="Find back your booking" style={{ textTransform: 'capitalize' }} />
                        <div className={styles.card}>
                            <form onSubmit={handleOnSubmit}>
                                <div className={styles.separator}>
                                    <CitiesSelector
                                        label="Leaving From"
                                        title="City From"
                                        name="departCity"
                                        onChange={(e) => setCityFrom(e.target.value)}
                                        value={cityFrom}
                                        required
                                    />
                                </div>
                                <div className={styles.separator}>
                                    <CitiesSelector
                                        label="Going To"
                                        title="City To"
                                        name="arriveCity"
                                        onChange={(e) => setCityTo(e.target.value)}
                                        value={cityTo}
                                        required
                                    />
                                </div>
                                <div className={styles.separator}>
                                    <Input 
                                        min={maxDate}
                                        label="Departure Date" 
                                        name="departDate" 
                                        type="date"
                                        value={departDate} 
                                        required
                                        onChange={(e) => setDepartDate(e.target.value)} />
                                </div>
                                <div className={styles.separator}>
                                    <Input 
                                        label="Phone Number" 
                                        name="phoneNumber" 
                                        type="text"
                                        value={phone} 
                                        required
                                        placeholder="09xxxxxxxx"
                                        onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <Button title="Find Ticket" type="submit" />
                            </form>
                        </div>
                    </div>
                    <div className={cx(styles.col, styles.rt__col)}>
                        <Title title="Your Ticket" style={{ textTransform: 'capitalize' }} />
                        <div className={styles.card}>
                        {
                            ticket && (
                                <table className={styles.table}>
                                    <tbody>
                                        <tr>
                                            <td>Customer Name</td>
                                            <td>{ticket?.contactInfo?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Phone</td>
                                            <td>{ticket?.contactInfo?.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>From</td>
                                            <td>{ticket?.cityFrom}</td>
                                        </tr>
                                        <tr>
                                            <td>To</td>
                                            <td>{ticket?.cityTo}</td>
                                        </tr>
                                        <tr>
                                            <td>Sub Total</td>
                                            <td>{ticket?.price} MMK</td>
                                        </tr>
                                        <tr>
                                            <td>In Dollar</td>
                                            <td>{ticket?.amount} USD</td>
                                        </tr>
                                        <tr>
                                            <td>Selected Seats</td>
                                            <td>
                                            {
                                                ticket?.selectedSeats?.map((s, index) => index === ticket?.selectedSeats.length - 1? <b key={index}>{s}</b> : <b key={index}>{s}, </b>)
                                            }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Buy Date</td>
                                            <td>{getDate(ticket?.createdAt).date}</td>
                                        </tr>
                                        <tr>
                                            <td>Buy Time</td>
                                            <td>{getDate(ticket?.createdAt).time}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        }
                        {
                            !ticket && error && (
                                <p className={styles.error}>{error}</p>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default Print;