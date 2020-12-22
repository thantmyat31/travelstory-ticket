import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import StripeCheckoutButton from '../../components/StripeCheckoutButton/StripeCheckoutButton';
import Title from './../../components/Title/Title';

import styles from './Payment.module.css';
import visaLogo from './../../assets/image/visa-icon.png';
import cx from 'classnames';
import useDollarXR from './../../hooks/useDollarXR';
import { getExchangeRateAction } from './../../redux/exchange/exchange.action';

const Payment = () => {
    const [ payment, setPayment ] = useState('');
    const { tripId, selectedSeats, numberOfTickets, nationality, contactInfo } = useSelector(state => state.ticket);
    const { tripById } = useSelector(state => state.trip);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getExchangeRateAction());
    }, [dispatch]);
    
    let price = 0;
    let amountInDollar = 0;
    if(tripId === tripById?._id) {
        price = tripById.price * numberOfTickets;
    } 
    amountInDollar = useDollarXR(price);

    if(!tripId || !selectedSeats || !numberOfTickets || !nationality || !contactInfo || !tripById) return (
        <Redirect to="/" />
    )

    return ( 
        <Layout>
            <div className="page">
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Title title="Customer Information" style={{ textTransform: 'capitalize' }} />
                            <div className={styles.card}>
                                <ul className={styles.list}>
                                    <li>
                                        <span className={styles.title}>Customer Name</span>
                                        <span> {contactInfo.name}</span>
                                    </li>
                                    <li>
                                        <span className={styles.title}>Customer Phone</span>
                                        <span> {contactInfo.phone}</span>
                                    </li>
                                    <li>
                                        <span className={styles.title}>Sub total</span>
                                        <span> {price} MMK</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <Title title="Trip Information" style={{ textTransform: 'capitalize' }} />
                            <div className={styles.card}>
                                <ul className={styles.list}>
                                    <li>
                                        <span className={styles.title}>Trip Name</span>
                                        <span>{' '}{tripById.tripName}</span>
                                    </li>
                                    <li>
                                        <span className={styles.title}>Seats</span>
                                        <span> {numberOfTickets}</span>
                                    </li>
                                    <li>
                                        <span className={styles.title}>Seleted Seats</span>
                                        <span> {
                                            selectedSeats.map((s, index) => index === selectedSeats.length - 1? <b key={index}>{s}</b> : <b key={index}>{s}, </b>)
                                        }
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <Title title="Price Details" style={{ textTransform: 'capitalize' }} />
                            <div className={styles.card}>
                                <ul className={styles.list}>
                                    <li>
                                        <span className={styles.title}>Sub total</span>
                                        <span> {price} MMK</span>
                                    </li>
                                    <li>
                                        <span className={styles.title}>In USD</span>
                                        <span> {amountInDollar} USD</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.col}>
                            <Title title="Payment Methods" style={{ textTransform: 'capitalize' }} />
                            <div className={styles.card}>
                                <span className={styles.methods}>
                                    <input 
                                        type="radio" 
                                        name="payment-method" 
                                        value="visa" 
                                        onChange={(e) => setPayment(e.target.value)} /> 
                                    <label>Visa Card</label>
                                    <img src={visaLogo} alt="visa card logo" />
                                </span>
                                <span className={styles.methods}>
                                    <input 
                                        type="radio" 
                                        name="payment-method" 
                                        value="paypal" 
                                        onChange={(e) => setPayment(e.target.value)} />
                                    <label>Paypal</label>
                                </span>
                                {payment && payment === 'visa' ? 
                                    <span className={styles.methods}>
                                        <StripeCheckoutButton 
                                            tripId={tripId}
                                            selectedSeats={selectedSeats}
                                            nationality={nationality}
                                            contactInfo={contactInfo}
                                            price={price} />
                                    </span>
                                : null}
                            </div>

                            <div className={cx(styles.card, styles.ads)}>
                                <img src={`${process.env.REACT_APP_IMAGE}/ads.png`} alt="ads" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default Payment;