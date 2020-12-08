import React from 'react';
import styles from './CardRow.module.css';

const CardRow = ({ children }) => {
    return ( 
        <div className={styles.container}>
            {children}
        </div>
     );
}
 
export default CardRow;