import React from 'react';
import styles from './Button.module.css';
import cx from 'classnames';

const Button = ({ title, type, onClick, style, icon, btnColor }) => {
    return ( 
        <button 
            style={style}
            type={type} 
            className={
                btnColor && btnColor === 'danger' ?
                cx(styles.button, styles.danger) :
                styles.button
            }
            onClick={onClick}
        >{title} {icon}</button>
     );
}
 
export default Button;