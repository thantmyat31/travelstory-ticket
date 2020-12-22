import React from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import AMUsersList from './AMUsersList/AMUsersList';
import AMCities from './AMCities/AMCities';
import AMDetails from './AMDetails/AMDetails';
import AMExchange from './AMExchange/AMExchange';
import { BsFillGridFill, BsFillPeopleFill, BsBuilding } from 'react-icons/bs';
import { FaExchangeAlt } from 'react-icons/fa';
 
const AdminDBPage = () => {
    const navLinks = [
        { path: '/auth/admin', name: 'Dashboard', icon: <BsFillGridFill /> },
        { path: '/auth/admin/users', name: 'Users', icon: <BsFillPeopleFill /> },
        { path: '/auth/admin/cities', name: 'Cities', icon: <BsBuilding /> },
        { path: '/auth/admin/exchange', name: 'Exchange', icon: <FaExchangeAlt /> }

    ];

    const routes = [
        { path: '/auth/admin', component: AMDetails },
        { path: '/auth/admin/users', component: AMUsersList },
        { path: '/auth/admin/cities', component: AMCities },
        { path: '/auth/admin/exchange', component: AMExchange }
    ];

    return (
        <DBLayout 
            navLinks={navLinks}
            routes={routes}
        />
     );
}
 
export default AdminDBPage;