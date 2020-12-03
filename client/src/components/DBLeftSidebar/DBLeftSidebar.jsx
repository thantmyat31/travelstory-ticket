import React from 'react';
import styles from './DBLeftSidebar.module.css';
import cx from 'classnames';

const DBLeftSidebar = ({ children, isDrawerOpen, setCloseFromProps }) => {
    return ( 
        <div onClick={() => setCloseFromProps(false)} className={isDrawerOpen?cx(styles.leftSidebar, styles.open):styles.leftSidebar}>
            {children}
        </div>
     );
}
 
export default DBLeftSidebar;