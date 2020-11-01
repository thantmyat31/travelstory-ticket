import React from 'react';
import styles from './ErrorNotice.module.css';

const ErrorNotice = ({ error, clearError }) => {
    return ( 
        <div className={styles.errorContainer}>
            <h4 className={styles.message}>{error}</h4>
            <b className={styles.close} onClick={clearError}>&times;</b>
        </div>
     );
}
 
export default ErrorNotice;