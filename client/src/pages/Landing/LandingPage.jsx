import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import Button from './../../components/Button/Button';
import CitiesSelector from '../../components/CitiesSelector/CitiesSelector';

import styles from './LandingPage.module.css';
import cx from 'classnames';
import useGetAllCities from './../../hooks/useGetAllCities';

const LandingPage = () => {
    const [ cityFrom, setCityFrom ] = useState('');
    const [ cityTo, setCityTo ] = useState('');
    const [ departDate, setDepartDate ] = useState('');
    const [ numberOfSeat, setNumberOfSeat ] = useState(1);
    const [ nationality, setNationality ] = useState('')

    const cities = useGetAllCities();

    const handleOnSubmit = () => {
        if(cityFrom === '' || cityTo === '' || departDate === '' || numberOfSeat === '' || nationality === '') {
            return;
        }
        const data = { cityFrom, cityTo, departDate, numberOfSeat, nationality };
        console.log(data);
    }

    return ( 
        <Layout>
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
            </div>
        </Layout>
     );
}
 
export default LandingPage;