import React from 'react';
import styles from './Title.module.css';

const Title = ({ title, style }) => {
    return ( 
        <h3 className={styles.title} style={style}>
            {title}
        </h3>
     );
}
 
export default Title;