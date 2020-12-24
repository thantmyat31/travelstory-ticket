import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/user/user.action';

import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/Login/Login.page';
import RegisterPage from './pages/Auth/Register/Register.page';
import NotFoundPage from './pages/NotFound/NotFound.page';
import ActivationPage from './pages/Auth/Activation/ActivationPage';
import SubscriberDBPage from './pages/Auth/SubscriberDBPage/SubscriberDBPage';
import AdminDBPage from './pages/Auth/AdminDBPage/AdminDBPage';
import AgencyDBPage from './pages/Auth/AgencyDBPage/AgencyDBPage';

import AuthRoute from './pages/Auth/AuthRoute';
import AdminRoute from './pages/Auth/AdminRoute';
import AgencyRoute from './pages/Auth/AgencyRoute';
import SelectSeat from './pages/SelectSeat/SelectSeat';
import ContactInfo from './pages/ContactInfo/ContactInfo';
import Payment from './pages/Payment/Payment';
import Completion from './pages/Completion/Completion';
import Print from './pages/Print/Print';


const App = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<div className="app">
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route path="/register" component={RegisterPage} />
				<Route path="/auth/activate/:token" component={ActivationPage} />
				<Route exact path="/select-seat/:tripId" component={SelectSeat} />
				<Route exact path="/contact-info" component={ContactInfo} />
				<Route exact path="/payment" component={Payment} />
				<Route exact path="/completion" component={Completion} />
				<Route exact path="/print" component={Print} />
				<Route exact path="/" component={LandingPage} />
				<AuthRoute path="/auth/subscriber" component={SubscriberDBPage} />
				<AgencyRoute path="/auth/agency" component={AgencyDBPage} />
				<AdminRoute path="/auth/admin" component={AdminDBPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</div>
	);
};

export default App;
