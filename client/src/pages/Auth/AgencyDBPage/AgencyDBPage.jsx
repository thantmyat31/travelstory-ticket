import React from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import AGDetails from './AGDetails/AGDetails';
import AGNewForm from './AGNewForm/AGNewForm';
import AGCreateTrip from './AGCreateTrip/AGCreateTrip';


import { BsFillGridFill, BsFileEarmarkPlus } from 'react-icons/bs';
import { FaBus } from 'react-icons/fa';

const AgencyDBPage = () => {
    const navLinks = [
        { path: '/auth/agency', name: 'Dashboard', icon: <BsFillGridFill />  },
        { path: '/auth/agency/new', name: 'Add Agency', icon: <BsFileEarmarkPlus /> },
        { path: '/auth/agency/trip-create', name: 'Create Trip', icon: <FaBus />}
    ];

    const routes = [
        { path: '/auth/agency', component: AGDetails },
        { path: '/auth/agency/new', component: AGNewForm },
        { path: '/auth/agency/trip-create', component: AGCreateTrip }
    ]
    

    return ( 
        <DBLayout 
            navLinks={navLinks}
            routes={routes}
        />
     );
}
 
export default AgencyDBPage;