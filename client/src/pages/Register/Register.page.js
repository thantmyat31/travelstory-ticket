import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../../redux/user/user.action';

import Input from '../../components/Input/Input';
import Button from './../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import styles from './Register.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorReset } from './../../redux/user/user.action';


const RegisterPage = () => {
    const [ displayName, setDisplayName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const { isAuth, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errorReset());
        if(error) {
            toast.error(error);
        }
    }, [dispatch, error]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(userRegisterAction({ displayName, email, password, confirmPassword }));
    }

	return (
        <Layout>
            {isAuth ? <Redirect to="/" />: null}
            <div className={styles.container}>
                <h1>Register</h1>
                <ToastContainer />
                <form onSubmit={handleOnSubmit}>
                    <Input 
                        label="display name"
                        name="displayName"
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
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
                    <Input 
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                        autoComplete="new-password"
                    />

                    <div className={styles.buttonContainer}>
                        <Button title="Register" type="submit" />
                    </div>
                </form>
            </div>
        </Layout>
	);
};

export default RegisterPage;
