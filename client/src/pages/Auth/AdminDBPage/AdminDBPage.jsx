import React from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import AMUsersList from './AMUsersList/AMUsersList';

const AdminDBPage = () => {
    const navLinks = [
        { path: '/auth/admin', name: 'Users List' },
    ];

    const routes = [
        { path: '/auth/admin', component: AMUsersList }
    ];

    return (
        <DBLayout 
            navLinks={navLinks}
            routes={routes}
        />
     );
}
 
export default AdminDBPage;