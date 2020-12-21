import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactInfoAction } from '../../redux/ticket/ticket.action';

import Button from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import Input from './../../components/Input/Input';
import Title from './../../components/Title/Title';

import styles from './ContactInfo.module.css';
import { toast, ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const ContactInfo = ({ history }) => {
    const [ contactInfo, setContactInfo ] = useState({
        name: '',
        gender: '',
        phone: '',
        email: '',
        note: ''
    });

    const { numberOfTickets, selectedSeats } = useSelector(state => state.ticket);
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(contactInfo.name === '' || contactInfo.gender === '' || contactInfo.phone === '') {
            return toast.error('You need to insert all fields with red astris.');
        }
        dispatch(addContactInfoAction(contactInfo));
        history.push('/payment');
    }

    if(!numberOfTickets || !selectedSeats.length) {
        return <Redirect to="/" />
    }

    return ( 
        <Layout>
            <ToastContainer />
            <div className="page">
                <div className={styles.container}>
                    <div className={styles.form}>
                        <Title title="Contact Information" style={{ textTransform:'capitalize', marginTop:'0' }} />
                        <div className={styles.card}>
                            <form onSubmit={handleOnSubmit}>
                                <Input 
                                    label="Name"
                                    type="text"
                                    name="name"
                                    value={contactInfo.name}
                                    required
                                    onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                                />
                                <Input 
                                    label="Phone"
                                    type="text"
                                    name="phone"
                                    value={contactInfo.phone}
                                    required
                                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                                />
                                <div className={styles.inputGroup}>
                                    <label htmlFor="gender">Gender <b>&#8727;</b></label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={contactInfo.gender} 
                                        onChange={(e) => setContactInfo({...contactInfo, gender: e.target.value})}>
                                        <option value="">-- Select ---</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <Input 
                                    label="email"
                                    type="email"
                                    name="email"
                                    value={contactInfo.email}
                                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                                />
                                <div className={styles.inputGroup}>
                                    <label>Note</label>
                                    <textarea
                                        value={contactInfo.note} 
                                        onChange={(e) => setContactInfo({...contactInfo, note: e.target.value})}></textarea>
                                </div>
                                <div className={styles.inputGroup}>
                                    <Button title="Submit" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.ads}>
                        <div className={styles.card}>
                            <img src={`${process.env.REACT_APP_IMAGE}/ads.png`} alt="Ads" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default ContactInfo;