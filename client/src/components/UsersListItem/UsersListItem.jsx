import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import Button from './../Button/Button';
import styles from './UsersListItem.module.css';
import { FaKey, FaTrashAlt } from 'react-icons/fa';

const UsersListItem = ({ user, openPopup, openDeletePopup, userRole, userId }) => {
    
    const handleOnChangeRole = () => {
        openPopup(true);
        userRole(user?.role);
        userId(user?._id);
    }
    
    return ( 
        <div className={styles.container}>
            <div className={styles.listItem}>
                <UserAvatar user={user} />
                <div className={styles.col}>
                    <span className={styles.info}>
                        <b>Name</b>
                        <p>: {user.displayName}</p>
                    </span>
                    <span className={styles.info}>
                        <b>Email</b>
                        <small>: {user.email}</small>
                    </span>
                    <span className={styles.info}>
                        <b>Role</b>
                        <p>: {user.role}</p>
                    </span>
                </div>
            </div>
            <div className={styles.listItem}>
                <div className={styles.col}>
                    <Button 
                        title="Change role" 
                        icon={<FaKey />} 
                        style={{ padding:'10px' }} 
                        onClick={handleOnChangeRole} 
                    />
                </div>
                <div className={styles.col}>
                    <Button 
                        title="Delete" 
                        icon={<FaTrashAlt />} 
                        style={{ padding:'10px' }}
                        btnColor="danger"  
                        onClick={() => openDeletePopup(true)}
                    />
                </div>
            </div>
        </div>
     );
}

export default UsersListItem;