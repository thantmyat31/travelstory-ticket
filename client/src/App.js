import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/user/user.action';

import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/Login/Login.page';
import RegisterPage from './pages/Auth/Register/Register.page';
import NotFoundPage from './pages/NotFound/NotFound.page';
import ActivationPage from './pages/Auth/Activation/ActivationPage';
import UserDBPage from './pages/Auth/UserDBPage/UserDBPage';
import AdminDBPage from './pages/Auth/AdminDBPage/AdminDBPage';

import AuthRoute from './pages/Auth/AuthRoute';
import AdminRoute from './pages/Auth/AdminRoute';


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
				<Route exact path="/" component={LandingPage} />
				<AuthRoute path="/auth/dashboard" component={UserDBPage} />
				<AdminRoute path="/auth/admin" component={AdminDBPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</div>
	);
};

export default App;
