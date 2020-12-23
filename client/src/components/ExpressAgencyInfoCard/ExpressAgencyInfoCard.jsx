import React from 'react';
import CardRow from '../CardRow/CardRow';

import styles from './ExpressAgencyInfoCard.module.css';

const ExpressAgencyInfoCard = ({ agency }) => {
    return ( 
        <CardRow style={{ alignItems: 'flex-start' }}>
            <div className={styles.lf__col}>
                <img src={`${process.env.REACT_APP_IMAGE}/${agency.image}`} alt="agency logo" />
            </div>
            <div className={styles.rt__col}>
                <div className={styles.info}>
                    <span className={styles.title}>Owner Name</span><span className={styles.info__detail}>{agency.owner.displayName}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.title}>Owner Email</span><span className={styles.info__detail}>{agency.owner.email}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.title}>Agency Name</span><span className={styles.info__detail}>{agency.name}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.title}>Agency Email</span><span className={styles.info__detail}>{agency.email}</span>
                </div>
                <div className={styles.info}>
                    <span className={styles.title}>Phone</span>
                    <ul className={styles.list}>
                    {
                        agency?.phones?.map((phone, index) => (
                            <li key={index}>
                                <span className={styles.title}>{phone.location}</span><span className={styles.info__detail}>{phone.number}</span>
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className={styles.info}>
                    <span className={styles.title}>Address</span>
                    <ul className={styles.list}>
                    {
                        agency?.addresses?.map((address, index) => (
                            <li key={index}>
                                <span className={styles.title}>{address.location}</span><span className={styles.info__detail}>{address.address}</span>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </CardRow>
     );
}
 
export default ExpressAgencyInfoCard;