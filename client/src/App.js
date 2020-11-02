import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import axios from 'axios';

import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/Login.page';
import RegisterPage from './pages/Register/Register.page';
import Header from './components/Header/Header';

import { connect } from 'react-redux';
import { saveUserInState } from './redux/user/user.action';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFoundPage from './pages/NotFound/NotFound.page';

const App = ({ saveUserInState }) => {

	useEffect(() => {
		const checkLoggin = async () => {
			let token = await localStorage.getItem("auth-token");
			if(!token) {
				localStorage.setItem("auth-token", "");
				token = "";
			}

			const response = await axios.post('http://localhost:2020/users/isTokenValid',null,{
				headers : {
					"x-auth-token": token
				}
			});

			const isTokenValid = await response.data;
			if(isTokenValid) {
				const user = await axios.get('http://localhost:2020/users', {
					headers: {
						"x-auth-token": token
					}
				});
				saveUserInState(token, user.data)
			}
		}

		checkLoggin();
	}, [saveUserInState]);

	return (
		<div className="app">
			<Header />
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route path="/register" component={RegisterPage} />
				<ProtectedRoute 
					exact
					path="/"
					component={LandingPage}
				/>
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	saveUserInState: (token, user) => dispatch(saveUserInState(token, user))
})

export default connect(null, mapDispatchToProps)(App);
