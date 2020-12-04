import React from 'react';
import styles from './Button.module.css';

const Button = ({ title, type, onClick, style, icon }) => {
    return ( 
        <button 
            style={style}
            type={type} 
            className={styles.button}
            onClick={onClick}
        >{title} {icon}</button>
     );
}
 
export default Button;