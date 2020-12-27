import React from 'react';
import styles from './Title.module.css';

const Title = ({ title, count,  style }) => {
    return ( 
        <h3 className={styles.title} style={style}>
            {title} {count&&<span className={styles.count}>{count}</span>}
        </h3>
     );
}
 
export default Title;