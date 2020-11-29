import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction, errorReset } from './../../redux/user/user.action';

import Input from '../../components/Input/Input';
import Button from './../../components/Button/Button';
import Layout from './../../components/Layout/Layout';
import styles from './Login.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [ email, setEmail ] = useState();
	const [ password, setPassword ] = useState();
	const { isAuth, error } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(errorReset());
		if(error) {
			toast.error(error);
		}
	}, [dispatch, error]);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
		dispatch(userLoginAction({ email, password }));
	}

	return (
		<Layout>
			{isAuth ? <Redirect to="/" />: null}
			<div className={styles.container}>
				<h1>Login</h1>
				<ToastContainer />
				<form onSubmit={handleOnSubmit}>
					<Input 
						name="email" 
						type="email" 
						onChange={(e) => setEmail(e.target.value)} 
						required={true} 
						autoComplete="email"
					/>
					<Input 
						name="password" 
						type="password" 
						onChange={(e) => setPassword(e.target.value)} 
						required={true} 
						autoComplete="current-password"
					/>

					<div className={styles.buttonContainer}>
						<Button title="Login" type="submit" />
					</div>
				</form>
			</div>
		</Layout>
	);
};


export default LoginPage;
