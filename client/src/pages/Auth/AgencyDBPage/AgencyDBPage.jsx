import React from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import AGDetails from './AGDetails/AGDetails';
import AGNewForm from './AGNewForm/AGNewForm';

const AgencyDBPage = () => {
    const navLinks = [
        { path: '/auth/agency', name: 'Dashboard' },
        { path: '/auth/agency/new', name: 'Add Agency Form' }
    ];

    const routes = [
        { path: '/auth/agency', component: AGDetails },
        { path: '/auth/agency/new', component: AGNewForm },
    ]
    

    return ( 
        <DBLayout 
            navLinks={navLinks}
            routes={routes}
        />
     );
}
 
export default AgencyDBPage;