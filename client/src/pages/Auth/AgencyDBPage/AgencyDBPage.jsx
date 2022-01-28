import React, {useEffect} from 'react';

import DBLayout from '../../../components/DBLayout/DBLayout';
import AGDetails from './AGDetails/AGDetails';
import AGNewForm from './AGNewForm/AGNewForm';
import AGCreateTrip from './AGCreateTrip/AGCreateTrip';

import { BsFillGridFill, BsFileEarmarkPlus } from 'react-icons/bs';
import { FaBus } from 'react-icons/fa';
import AGSeats from './AGSeats/AGSeats';
import { useDispatch } from 'react-redux';
import { getAllTripsAction } from './../../../redux/trip/trip.action';
import Profile from './../Profile/Profile';

const AgencyDBPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTripsAction());
    }, [dispatch]);

    const navLinks = [
        { path: '/auth/agency', name: 'Dashboard', icon: <BsFillGridFill />  },
        { path: '/auth/agency/new', name: 'Add Agency', icon: <BsFileEarmarkPlus /> },
        { path: '/auth/agency/trip-create', name: 'Create Trip', icon: <FaBus />}
    ];

    const routes = [
        { path: '/auth/agency', component: AGDetails },
        { path: '/auth/agency/new', component: AGNewForm },
        { path: '/auth/agency/trip-create', component: AGCreateTrip },
        { path: '/auth/agency/seats-plan/:tripId', component: AGSeats },
        { path: '/auth/agency/profile',  component: Profile}
    ]
    

    return ( 
        <DBLayout 
            navLinks={navLinks}
            routes={routes}
        />
     );
}
 
export default AgencyDBPage;