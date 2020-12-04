import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../redux/admin/admin.action';
import useCheckTokenValid from '../../../hooks/useCheckTokenValid';

import Layout from '../../../components/Layout/Layout';

import DBLeftSidebar from '../../../components/DBLeftSidebar/DBLeftSidebar';
import DBRightContent from '../../../components/DBRightContent/DBRightContent';

import styles from './AdminDBPage.module.css';

import { NavLink, Switch, Route } from 'react-router-dom';
import AMUsersList from './AMUsersList/AMUsersList';

const AdminDBPage = () => {
    useCheckTokenValid();
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
    const { token } = useSelector(state => state.user);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(token) dispatch(getAllUsersAction(token));
    }, [dispatch, token]);

    

    return ( 
        <Layout>
            <div className={styles.dashboard}>
                <DBLeftSidebar setCloseFromProps={(value) => setIsDrawerOpen(value)} isDrawerOpen={isDrawerOpen}>
                    <NavLink to="/auth/admin" className={styles.navLink} activeClassName={styles.active}>Users List</NavLink>
                </DBLeftSidebar>

                <DBRightContent onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                    <Switch>
                        <Route exact path="/auth/admin" component={AMUsersList} />
                    </Switch>
                </DBRightContent>
            </div>
        </Layout>   
     );
}
 
export default AdminDBPage;