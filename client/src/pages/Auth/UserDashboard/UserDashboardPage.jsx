import React from 'react';
import Layout from './../../../components/Layout/Layout';
import useCheckTokenValid from './../../../hooks/useCheckTokenValid';

const UserDashboardPage = () => {
    useCheckTokenValid();

    return ( 
        <Layout>
            UserDashboard Page
        </Layout>   
     );
}
 
export default UserDashboardPage;