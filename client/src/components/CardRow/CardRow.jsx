import React from 'react';
import styles from './CardRow.module.css';

const CardRow = ({ children, style }) => {
    return ( 
        <div className={styles.container} style={style}>
            {children}
        </div>
     );
}
 
export default CardRow;