import React from 'react';
import styles from './UserAvatar.module.css';

const UserAvatar = ({ user, style }) => {
    let avatarUrl = '';
    if(user.image) {
        avatarUrl = `${process.env.REACT_APP_API}/${user.image}`;
    } else {
        avatarUrl = `https://ui-avatars.com/api/?name=${user.displayName}&size=40&background=random`;
    }
    
    return ( 
        <img style={style} className={styles.avatar} src={avatarUrl} alt="User Avatar" />
     );
}
 
export default UserAvatar;