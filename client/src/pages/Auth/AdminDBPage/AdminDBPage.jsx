import React from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import AMUsersList from './AMUsersList/AMUsersList';
import AMCities from './AMCities/AMCities';
import AMDetails from './AMDetails/AMDetails';
import AMExchange from './AMExchange/AMExchange';
import AMAgenciesList from './AMAgenciesList/AMAgenciesList';
import AMTripsList from './AMTripsList/AMTripsList';

import { BsFillGridFill, BsFillPeopleFill, BsBuilding, BsBriefcaseFill } from 'react-icons/bs';
import { FaExchangeAlt, FaBus } from 'react-icons/fa';
import Profile from './../Profile/Profile';
 
const AdminDBPage = () => {
    const navLinks = [
        { path: '/auth/admin', name: 'Dashboard', icon: <BsFillGridFill /> },
        { path: '/auth/admin/users', name: 'Users', icon: <BsFillPeopleFill /> },
        { path: '/auth/admin/cities', name: 'Cities', icon: <BsBuilding /> },
        { path: '/auth/admin/exchange', name: 'Exchange', icon: <FaExchangeAlt /> },
        { path: '/auth/admin/express-agencies', name: 'Agencies', icon: <BsBriefcaseFill /> },
        { path: '/auth/admin/trips', name: 'Trips', icon: <FaBus /> }
    ];

    const routes = [
        { path: '/auth/admin', component: AMDetails },
        { path: '/auth/admin/users', component: AMUsersList },
        { path: '/auth/admin/cities', component: AMCities },
        { path: '/auth/admin/exchange', component: AMExchange },
        { path: '/auth/admin/express-agencies', component: AMAgenciesList },
        { path: '/auth/admin/trips', component: AMTripsList },
        { path: '/auth/admin/profile',  component: Profile}
    ];

    return (
        <DBLayout 
            navLinks={navLinks}
            routes={routes}
        />
     );
}
 
export default AdminDBPage;