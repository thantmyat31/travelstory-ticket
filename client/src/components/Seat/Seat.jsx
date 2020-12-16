import React, { useState } from 'react';
import styles from './Seat.module.css';
import cx from 'classnames';

const Seat = ({ number }) => {
    const [ isActive, setIsActive ] = useState(false);
    return ( 
        <div className={isActive?cx(styles.seat, styles.active):styles.seat} onClick={() => setIsActive(!isActive)}>{number}</div>
     );
}
 
export default Seat;