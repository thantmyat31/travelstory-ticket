import React from 'react';
import { useSelector } from 'react-redux';
import { BsFillEnvelopeFill, BsFillStarFill, BsFillBriefcaseFill } from 'react-icons/bs';
import Title from '../../../components/Title/Title';
import CardRow from '../../../components/CardRow/CardRow';
import styles from './Profile.module.css';

const Profile = () => {
    const { user } = useSelector(state => state.user);
    console.log(user);
    return ( 
        <div className={styles.profile}>
            <Title title="Profile" />
            <CardRow>
                <ul className={styles.list}>
                    <li><span><BsFillStarFill/> <b>DisplayName</b></span> : {user.displayName}</li>
                    <li><span><BsFillEnvelopeFill/> <b>Email</b></span> : {user.email}</li>
                    <li><span><BsFillBriefcaseFill/> <b>Role</b></span> : {user.role}</li>
                </ul>
            </CardRow>
        </div>
     );
}
 
export default Profile;