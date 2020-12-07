import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, name, type, autoComplete, onChange, required, value, placeholder, defaultValue, disabled }) => {
    return ( 
        <div className={styles.inputGroup}>
            <label htmlFor={name}>
                {label ? label : name} 
                {required && <b> &#8727;</b>}
            </label>
            <input
                name={name}
                id={name}
                type={type}
                autoComplete={autoComplete}
                onChange={onChange} 
                required={required}
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                disabled={disabled? true: false}
            />
        </div>
     );
}
 
export default Input;