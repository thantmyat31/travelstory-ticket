import React from 'react';
import { useSelector } from 'react-redux';

import Title from '../../../../components/Title/Title';
import Loading from '../../../../components/Loading/Loading';
import styles from './SBDetails.module.css';

const SBDetails = () => {
    const { user } = useSelector(state => state.user);

    const renderProfile = (user) => {
        if(!user) return <Loading />;
        return (
            <>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{user.displayName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{user.role}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    return ( 
        <>
            <Title title="Profile" />
            {renderProfile(user)}
        </>
     );
}
 
export default SBDetails;