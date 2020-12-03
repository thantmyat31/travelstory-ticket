import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';

import styles from './UsersListItem.module.css';

const UsersListItem = ({ user }) => {
    return ( 
        <div className={styles.listItem}>
            <UserAvatar user={user} />
            <div className={styles.info}>
                <span className={styles.col}>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Role</p>
                </span>
                <span className={styles.col}>
                    <p>: {user.displayName}</p>
                    <p>: {user.email}</p>
                    <p>: {user.role}</p>
                </span>
            </div>
        </div>
     );
}

export default UsersListItem;