import React from 'react';
import styles from './Loading.module.css';
import cx from 'classnames';

const Loading = () => {
    return ( 
        <>
            <div className={styles.loading__container}>
                <span className={cx(styles.item, styles.item__1)}></span>
                <span className={cx(styles.item, styles.item__2)}></span>
                <span className={cx(styles.item, styles.item__3)}></span>
                <span className={cx(styles.item, styles.item__4)}></span>
                <span className={cx(styles.item, styles.item__5)}></span>
            </div>
        </>
     );
}
 
export default Loading;