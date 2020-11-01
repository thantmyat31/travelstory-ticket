import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { newUserRegister, userLogin } from './../../api/api';
import { connect } from 'react-redux';
import { saveUserInState } from './../../redux/user/user.action';

import Input from '../../components/Input/Input';
import Button from './../../components/Button/Button';
import styles from './Register.module.css';
import ErrorNotice from '../../components/ErrorNotice/ErrorNotice';


const RegisterPage = ({ saveUserInState }) => {
    const [ displayName, setDisplayName ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const [ error, setError ] = useState();
    const history = useHistory();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
       
        try {
            const newUser = { displayName, email, password, confirmPassword };
            
            // New user register
            const registerResponse = await newUserRegister(newUser);
            if(registerResponse) {
                console.log(registerResponse)
                throw new Error(registerResponse);
            }
            
            // User login
            const loginResponse = await userLogin(email, password);
            
            const { token, user } = loginResponse.data;
            
            // Save user in state
            saveUserInState(token, user);

            // Save token in localStorage
            localStorage.setItem("auth-token", token);
            history.push("/"); 

        } catch (error) {
            setError(error.message);
        }
    }

	return (
		<div className={styles.container}>
            <h1>Register</h1>
            {
                error && <ErrorNotice error={error} clearError={() => setError(undefined)} />
            }
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
	);
};

const mapDispatchToProps = dispatch => ({
    saveUserInState: (token, user) => dispatch(saveUserInState(token, user))
})

export default connect(null, mapDispatchToProps)(RegisterPage);
