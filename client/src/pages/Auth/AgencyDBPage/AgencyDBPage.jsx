import React from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import AGDetails from './AGDetails/AGDetails';
import AGNewForm from './AGNewForm/AGNewForm';
import AGCreateTrip from './AGCreateTrip/AGCreateTrip';

const AgencyDBPage = () => {
    const navLinks = [
        { path: '/auth/agency', name: 'Dashboard' },
        { path: '/auth/agency/new', name: 'Add Agency Form' },
        { path: '/auth/agency/trip-create', name: 'Create Trip'}
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