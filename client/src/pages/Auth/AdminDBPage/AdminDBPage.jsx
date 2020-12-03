import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../redux/admin/admin.action';
import useCheckTokenValid from '../../../hooks/useCheckTokenValid';

import Layout from '../../../components/Layout/Layout';
import UsersListItem from '../../../components/UsersListItem/UsersListItem';
import DBLeftSidebar from '../../../components/DBLeftSidebar/DBLeftSidebar';
import DBRightContent from '../../../components/DBRightContent/DBRightContent';

import styles from './AdminDBPage.module.css';

const AdminDBPage = () => {
    useCheckTokenValid();
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
    const { token } = useSelector(state => state.user);
    const { admins, subscribers, agencies } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        if(token) dispatch(getAllUsersAction(token));
    }, [dispatch, token]);

    const renderUsers = (users) => {
        return users.map((user, index) => <UsersListItem key={index} user={user} />)
    }

    return ( 
        <Layout>
            <div className={styles.dashboard}>
                <DBLeftSidebar setCloseFromProps={(value) => setIsDrawerOpen(value)} isDrawerOpen={isDrawerOpen}>
                    LeftSidebar
                </DBLeftSidebar>

                <DBRightContent onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                    <h3>Admin Users</h3>
                    {admins?renderUsers(admins):'loading......'}

                    <h3>Subscribed Users</h3>
                    {subscribers?renderUsers(subscribers):'loading......'}

                    <h3>Agencies</h3>
                    {agencies?renderUsers(agencies):'loading......'}
                </DBRightContent>
            </div>
        </Layout>   
     );
}
 
export default AdminDBPage;