import React from 'react';
import styles from './DBRightContent.module.css';
import { BsFillGearFill } from 'react-icons/bs';

const DBRightContent = ({ children, onClick }) => {
    return ( 
        <div className={styles.rightContent}>
            <div className={styles.gear__smallscreen}>
                <BsFillGearFill className={styles.gear__icon} onClick={onClick} />
            </div>
            <div className={styles.contents}>
                {children}
            </div>
        </div>
     );
}
 
export default DBRightContent;