import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ children, title }) => {
    return ( 
        <div className={styles.popup}>
            <div className={styles.popup__inner}>
                <h5>{title}</h5>
                { children }
            </div>
        </div>
     );
}
 
export default Popup;