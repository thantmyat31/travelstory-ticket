import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExpressAgencyAction } from './../../../../redux/agency/agency.action';
import { errorReset } from './../../../../redux/user/user.action';

import Input from './../../../../components/Input/Input';
import ImageDropzone from '../../../../components/ImageDropzone/ImageDropzone';
import Button from '../../../../components/Button/Button';

import styles from './AGNewForm.module.css';
import cx from 'classnames';
import { toast, ToastContainer } from 'react-toastify';

const AGNewForm = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phones, setPhones ] = useState([]);
    const [ addresses, setAddresses ] = useState([]);
    const [ file, setFile ] = useState(null);

    const [ phoneLocation, setPhoneLocation ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ addressLocation, setAddressLocation ] = useState('');
    const [ addressString, setAddressString ] = useState('');

    const { token, user } = useSelector(state => state.user);
    const { error, express_agency } = useSelector(state => state.agency);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errorReset());
        if(error) {
            toast.error(error);
        }
    }, [dispatch, error]);

    const getFile = (file) => {
        setFile(file);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        
        if(!name || !email || !phones.length || !addresses.length) {
            toast.error('Enter all fileds with red astris sign.');
        } else {
            if(user && token) {
                const data = { userId: user._id, name, email, phones, addresses, file };
                setName('');
                setEmail('');
                setPhones([]);
                setAddresses([]);
                setFile(null);
                dispatch(createExpressAgencyAction({ data, token }))
            }   
        }
    }

    const handleOnAddPhone = () => {
        if(phoneLocation && phoneNumber) setPhones([...phones, { location: phoneLocation, number: phoneNumber }]);
        setPhoneLocation('');
        setPhoneNumber('');
    }

    const handleOnAddAddress = () => {
        if(addressLocation && addressString) setAddresses([...addresses, { location: addressLocation, address: addressString }]);
        setAddressLocation('');
        setAddressString('');
    }

    const phoneFormRender = (phones) => {
        return phones.map((phone, index) => (
            <div key={index} className={styles.group__row}>
                <div className={styles.group__col}>
                    <Input type="text" defaultValue={phone.location} disabled />
                </div>
                <div className={styles.group__col}>
                    <Input type="text" defaultValue={phone.number} disabled />
                </div>
            </div>
        ))
    }

    const addressFormRender = (addresses) => {
        return addresses.map((address, index) => (
            <div key={index} className={styles.group__row}>
                <div className={styles.group__col}>
                    <Input type="text" defaultValue={address.location} disabled />
                </div>
                <div className={styles.group__col}>
                    <textarea type="text" className={styles.textarea} rows="3" defaultValue={address.address} disabled />
                </div>
            </div>
        ))
    }

    if(express_agency) return (
        <div>
            <h2>You have already created an express agency.</h2>
            <p>Only allowed to create 1 express agency for a user (agency) account.</p>
        </div>
    )

    return ( 
        <>
            <ToastContainer />
            <form onSubmit={handleOnSubmit}>
                <div className={styles.form__row}>
                    <div className={styles.form__col}>
                        <Input 
                            name="name" 
                            type="text" 
                            onChange={(e) => setName(e.target.value)} 
						    required={true}
                            autoComplete="name"
                            value={name} />
                        <Input 
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                            autoComplete="email"
                            value={email} />
                        <div className={styles.groups}>
                            <label>Phone Numbers <b> &#8727;</b></label>
                            {phoneFormRender(phones)}

                            <div className={styles.group__row}>
                                <div className={styles.group__col}>
                                    <Input type="text" placeholder="Eg. Yangon" onChange={(e) =>  setPhoneLocation(e.target.value)} value={phoneLocation} />
                                </div>
                                <div className={styles.group__col}>
                                    <Input type="text" placeholder="09xxxxxxxxx" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                                </div>
                            </div>
                            <div className={styles.group__row}>
                                <Button onClick={handleOnAddPhone} title="Add Phone" type="button" btnColor="light" style={{ padding:"5px 10px" }} />
                            </div>
                        </div>

                        <div className={styles.groups}>
                            <label>Addresses<b> &#8727;</b></label>
                            {addressFormRender(addresses)}

                            <div className={styles.group__row}>
                                <div className={styles.group__col}>
                                    <Input type="text" placeholder="Eg. Yangon" onChange={(e) =>  setAddressLocation(e.target.value)} value={addressLocation} />
                                </div>
                                <div className={styles.group__col}>
                                    <textarea rows={3} type="text" placeholder="(123), Thukha road, Lathar" onChange={(e) => setAddressString(e.target.value)} value={addressString} className={styles.textarea} />
                                </div>
                            </div>
                            <div className={styles.group__row}>
                                <Button onClick={handleOnAddAddress} title="Add Address" type="button" btnColor="light" style={{ padding:"5px 10px" }} />
                            </div>
                        </div>
                    </div>
                    <div className={cx(styles.form__col, styles.dropzone)}>
                        <ImageDropzone getFile={getFile} />
                    </div>
                </div>
                <div className={styles.form__row}>
                    <div className={styles.form__col}>
                        <Button type="submit" title="Create" />
                    </div>
                </div>
            </form>
        </>
     );
}
 
export default AGNewForm;