import React from 'react';
import styles from './CitiesSelector.module.css';
import { useSelector } from 'react-redux';

const CitiesSelector = ({ label, title, name, onChange, value, cities, required }) => {
    const { cities: getCities } = useSelector(state => state.city);

    const renderCitiesOption = (cities) => {
        return cities?.map((city, index) => <option key={index} value={city.name}>{city.name}</option>)
    }

    return ( 
        <>
            <label htmlFor={name} className={styles.label}>{label} {required && <b> &#8727;</b>}</label>
            <select id={name} className={styles.select} name={name} onChange={onChange} value={value} required>
                <option value="">-- {title} --</option>
                {renderCitiesOption(cities?cities:getCities)}
            </select>
        </>
     );
}
 
export default CitiesSelector;