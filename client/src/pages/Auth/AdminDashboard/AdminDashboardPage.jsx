import React from 'react';
import Layout from './../../../components/Layout/Layout';
import useCheckTokenValid from './../../../hooks/useCheckTokenValid';

const AdminDashboardPage = () => {
    useCheckTokenValid();

    return ( 
        <Layout>
            Admin Dashboard Page
        </Layout>   
     );
}
 
export default AdminDashboardPage;