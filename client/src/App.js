import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/Login.page';
import RegisterPage from './pages/Register/Register.page';
import NotFoundPage from './pages/NotFound/NotFound.page';

import AuthRoute from './components/AuthRoute/AuthRoute';
import { checkAuth } from './redux/user/user.action';

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
				<AuthRoute 
					exact
					path="/"
					component={LandingPage}
				/>
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</div>
	);
};

export default App;
