import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCityAction, deleteCityAction, getAllCitiesAction } from './../../../../redux/city/city.action';

import Button from '../../../../components/Button/Button';
import CardRow from '../../../../components/CardRow/CardRow';
import Title from '../../../../components/Title/Title';
import Input from './../../../../components/Input/Input';
import Popup from './../../../../components/Popup/Popup';

import styles from './AMCities.module.css';
import { toast, ToastContainer } from 'react-toastify';

const AMCities = () => {
    const [ name, setName ] = useState('');
    const [ code, setCode ] = useState('');
    const [ cityId, setCityId ] = useState('');
    const [ openDeletePopup, setOpenDeletePopup ] = useState(false);
    const { cities } = useSelector(state => state.city);
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCitiesAction());
    }, [dispatch]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(token) {
            if(name && code) {
                const city = { name: name.toLowerCase(), code: code.toUpperCase() };
                setName('');
                setCode('');
                dispatch(addCityAction({ city, token }));
            } else {
                toast.error('Enter all fields.');
            }
        } 
        else toast.error('Invalid token. Try again.');
    }

    const handleOnPreDelete = (cityId) => {
        setCityId(cityId);
        setOpenDeletePopup(true);
    }

    const handleOnDelete = (cityId) => {
        setOpenDeletePopup(false);
        if(token && cityId) {
            dispatch(deleteCityAction({cityId, token}));
        }
    }

    return ( 
        <>
            <ToastContainer />
            <form onSubmit={handleOnSubmit}>
                <Title title="Add New City" />
                <CardRow>
                    <span className={styles.form__col}>
                        <Input type="text" label="City Name" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                    </span>
                    <span className={styles.form__col}>
                        <Input type="text" label="City Code" name="code" onChange={(e) => setCode(e.target.value)} value={code} />
                    </span>
                    <span className={styles.form__col}>
                        <Button type="submit" title="Add City" />
                    </span>
                </CardRow>
            </form>
            <div>
                <Title title="City Table" />
                <CardRow>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Code</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities && cities.map((city, index) => (
                                <tr key={index}>
                                    <td className={styles.city__name}>{city.name}</td>
                                    <td>{city.code}</td>
                                    <td>
                                        <Button title="delete" btnColor="danger" style={{ padding:'5px' }} onClick={() => handleOnPreDelete(city._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardRow>
                {
                    openDeletePopup ?
                    <Popup title="Are you sure to delete this city?">
                        <div className={styles.button__group}>
                            <Button 
                                title="cancel" 
                                onClick={() => setOpenDeletePopup(false)} 
                                btnColor="danger"
                            />
                            <Button 
                                title="delete" 
                                style={{ marginLeft:'10px' }}
                                onClick={() => handleOnDelete(cityId)}
                            />
                        </div>
                    </Popup>: null
                }
            </div>
        </>
     );
}
 
export default AMCities;