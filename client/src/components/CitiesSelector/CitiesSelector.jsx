import React from 'react';
import styles from './CitiesSelector.module.css';

const CitiesSelector = ({ label, title, name, onChange, value, cities }) => {
    const renderCitiesOption = (cities) => {
        return cities?.map((city, index) => <option key={index} value={city.name}>{city.name}</option>)
    }

    return ( 
        <>
            <label htmlFor={name} className={styles.label}>{label}</label>
            <select id={name} className={styles.select} name={name} onChange={onChange} value={value}>
                <option value="">-- {title} --</option>
                {renderCitiesOption(cities)}
            </select>
        </>
     );
}
 
export default CitiesSelector;