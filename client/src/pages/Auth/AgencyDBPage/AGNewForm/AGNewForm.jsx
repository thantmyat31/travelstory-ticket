import React, { useState } from 'react';

import Input from './../../../../components/Input/Input';
import ImageDropzone from '../../../../components/ImageDropzone/ImageDropzone';
import styles from './AGNewForm.module.css';
import cx from 'classnames';
import Button from '../../../../components/Button/Button';

// _id: result._id,
// name: result.name,
// email: result.email,
// phones: result.phones,
// addresses: result.addresses,
// image: result.image,

const AGNewForm = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phones, setPhones ] = useState([]);
    const [ addresses, setAddresses ] = useState([]);
    const [ file, setFile ] = useState('');

    const [ phoneLocation, setPhoneLocation ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');

    const getFile = (file) => {
        setFile(file);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(name, email, phones, addresses, file);
    }

    const handleOnAddPhone = () => {
        if(phoneLocation && phoneNumber) setPhones([...phones, { location: phoneLocation, number: phoneNumber }]);
        setPhoneLocation('');
        setPhoneNumber('');
    }

    const phoneFormRender = (phones) => {
        return phones.map((phone, index) => (
            <span key={index}>
                <input type="text" value={phone.location} disabled />
                <input type="text" value={phone.number} disabled />
            </span>
        ))
    }

    return ( 
        <>
            <form onSubmit={handleOnSubmit}>
                <div className={styles.form__role}>
                    <div className={styles.form__col}>
                        <Input 
                            name="name" 
                            type="text" 
                            onChange={(e) => setName(e.target.value)} 
						    required={true}
						    autoComplete="name" />
                        <Input 
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                            autoComplete="email" />
                        <div>
                            {phoneFormRender(phones)}

                            <span>
                                <input type="text" placeholder="Location" onChange={(e) => setPhoneLocation(e.target.value)} value={phoneLocation} />
                                <input type="text" placeholder="Phone" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                                <b onClick={handleOnAddPhone}>Add Phone</b>
                            </span>
                            
                            
                        </div>
                    </div>
                    <div className={cx(styles.form__col, styles.dropzone)}>
                        <ImageDropzone getFile={getFile} />
                    </div>
                </div>
                <Button type="submit" title="Create" />
            </form>
        </>
     );
}
 
export default AGNewForm;