import React, {useState, useEffect} from 'react';
import { clearSearchTripsAction, searchTripsAction, getAllTripsAction } from './../../redux/trip/trip.action';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import Button from './../../components/Button/Button';
import CitiesSelector from '../../components/CitiesSelector/CitiesSelector';
import Trip from './../../components/Trip/Trip';

import useGetAllCities from './../../hooks/useGetAllCities';
import styles from './LandingPage.module.css';
import cx from 'classnames';
import { ToastContainer, toast } from 'react-toastify';

const LandingPage = ({ history }) => {
    const [ cityFrom, setCityFrom ] = useState('');
    const [ cityTo, setCityTo ] = useState('');
    const [ departDate, setDepartDate ] = useState('');
    const [ numberOfSeat, setNumberOfSeat ] = useState(1);
    const [ nationality, setNationality ] = useState('');

    const { searchResult } = useSelector(state => state.trip);
    const dispatch = useDispatch();
    const cities = useGetAllCities();

    useEffect(() => {
        dispatch(clearSearchTripsAction());
        dispatch(getAllTripsAction());
    }, [dispatch]);

    const dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if(month < 10) month = `0${month.toString()}`;
    if(day < 10) day = `0${day.toString()}`;
    const maxDate = `${year}-${month}-${day}`;

    const handleOnSubmit = () => {
        if(cityFrom === '' || cityTo === '' || departDate === '' || numberOfSeat === '' || nationality === '') {
            toast.error('Enter all fields to search.')
            return;
        }
        const data = { cityFrom, cityTo, departDate, numberOfSeat, nationality };
        dispatch(searchTripsAction({data}));
        if(!searchResult.length) toast.warn('No trip.');
        else toast.success(`${searchResult.length} result${searchResult>0?'s':''} found.`);
    }

    return ( 
        <Layout>
            <ToastContainer />
            <div className="page">
                <div className={styles.row}>
                    <div className={cx(styles.col, styles.col__lt)}>
                        <div className={styles.card}>
                            <div className={styles.input__row}>
                                <div className={styles.input__col}>
                                    <CitiesSelector 
                                        label="Leaving From" 
                                        title="City From"
                                        value={cityFrom}
                                        cities={cities}
                                        onChange={(e) => setCityFrom(e.target.value)} />
                                </div>
                                <div className={styles.input__col}>
                                    <CitiesSelector 
                                        label="Going To" 
                                        title="City To"
                                        value={cityTo}
                                        cities={cities}
                                        onChange={(e) => setCityTo(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.input__row}>
                                <div className={styles.input__col}>
                                    <label htmlFor="departDate" className={styles.label}>Departure Date</label>
                                    <input 
                                        id="departDate"
                                        type="date" 
                                        min={maxDate}
                                        value={departDate}
                                        className={styles.input}
                                        onChange={(e) => setDepartDate(e.target.value)} />
                                </div>
                                <div className={styles.input__col}>
                                    <label htmlFor="numberOfSeat" className={styles.label}>Number of seat</label>
                                    <select id="numberOfSeat" onChange={(e) => setNumberOfSeat(Number(e.target.value))} className={styles.select} value={numberOfSeat}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.input__row}>
                                <div className={styles.input__col}>
                                <label htmlFor="nationality" className={styles.label}>Nationality</label>
                                    <select id="nationality" onChange={(e) => setNationality(e.target.value)} className={styles.select} value={nationality}>
                                        <option value="">-- Select --</option>
                                        <option value="myanmar">Myanmar</option>
                                        <option value="foreigner">Foreigner</option>
                                    </select>
                                </div>
                                <div className={styles.input__col}>
                                    <Button title="Search" style={{ padding:'10px', width:'100%' }} onClick={handleOnSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx(styles.col, styles.col__rt)}>
                        <div className={styles.card}>
                            <img 
                                className={styles.image} 
                                src={`${process.env.REACT_APP_IMAGE}/ads.png`}
                                alt="advertisement" />
                        </div>
                    </div>
                </div>
                <div className={cx(styles.row, styles.result)}>
                {
                    searchResult && searchResult?.length ? 
                        searchResult.map((trip, index) => <Trip key={index} trip={trip} onSelectSeat={() => history.push(`/select-seat/${trip._id}`)} />)
                    : null
                }
                </div>
            </div>
        </Layout>
     );
}
 
export default LandingPage;