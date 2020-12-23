import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './../../../components/Layout/Layout';
import Button from './../../../components/Button/Button';

import styles from './ActivationPage.module.css';
import jwt from 'jsonwebtoken';
import { accountActivationAction, errorReset } from './../../../redux/user/user.action';
import { ToastContainer, toast } from 'react-toastify';

const ActivationPage = ({ match, history }) => {

    const [ token, setToken ] = useState('');
    const [ displayName, setDisplayName ] = useState('');
    const [ buttonText, setButtonText ] = useState('Activate Account');
    const { error, isAuth } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errorReset());
        if(error) {
            toast.error(error);
            setButtonText('Activate Account');
        }
    }, [dispatch, error]);

    useEffect(() => {
        const token = match.params.token;
        const { displayName } = jwt.decode(token);
        if(token) {
            setDisplayName(displayName);
            setToken(token);
        }
    }, [match.params.token]);

    const handleOnActivate = (event) => {
        event.preventDefault();
        setButtonText('Activating...');
        dispatch(accountActivationAction(token));
    }

    if(isAuth) {
        setTimeout(() => history.push("/auth/subscriber"), 5000)
        return (
            <Layout>
                <div className={styles.container}>
                    <h1 className={styles.success}>Your account is activated.</h1>
                </div>
            </Layout>
        )
    }

    return ( 
        <Layout>
            <div className={styles.container}>
                <ToastContainer />
                <h1>Hello, {displayName}. Click the following button to activate your account.</h1>
                <Button title={buttonText} onClick={handleOnActivate} />
            </div>
        </Layout>
     );
}
 
export default ActivationPage;