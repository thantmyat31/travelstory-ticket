import React from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import SBDetails from './SBDetails/SBDetails';

import { BsFillGridFill } from 'react-icons/bs';
import Profile from './../Profile/Profile';

const SubscriberDBPage = () => {

    const navLinks = [
        { path: '/auth/subscriber', name: 'Dashboard', icon: <BsFillGridFill />  }
    ];

    const routes = [
        { path: '/auth/subscriber', component: SBDetails },
        { path: '/auth/subscriber/profile',  component: Profile}
    ];

    return ( 
        <DBLayout 
            navLinks={navLinks}
            routes={routes}
        />
     );
}
 
export default SubscriberDBPage;