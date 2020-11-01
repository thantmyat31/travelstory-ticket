import React from 'react';
import styles from './Button.module.css';

const Button = ({ title, type, onClick }) => {
    return ( 
        <button 
            type={type} 
            className={styles.button}
            onClick={onClick}
        >{title}</button>
     );
}
 
export default Button;