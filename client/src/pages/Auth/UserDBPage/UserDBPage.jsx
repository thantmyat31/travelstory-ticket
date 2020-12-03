import React from 'react';
import Layout from '../../../components/Layout/Layout';
import useCheckTokenValid from '../../../hooks/useCheckTokenValid';

const UserDBPage = () => {
    useCheckTokenValid();

    return ( 
        <Layout>
            UserDashboard Page
        </Layout>   
     );
}
 
export default UserDBPage;