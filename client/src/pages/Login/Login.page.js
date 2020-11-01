import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { userLogin } from './../../api/api';
import { connect } from 'react-redux';
import { saveUserInState } from './../../redux/user/user.action';

import Input from '../../components/Input/Input';
import Button from './../../components/Button/Button';
import styles from './Login.module.css';


const LoginPage = ({ saveUserInState }) => {
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const history = useHistory();

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        
        // User login
        const loginResponse = await userLogin(email, password);
        const { token, user } = loginResponse.data;
        
        // Save user in state
        saveUserInState(token, user);

        // Save token in localStorage
        localStorage.setItem("auth-token", token);
        history.push("/");
    }

	return (
		<div className={styles.container}>
			<h1>Login</h1>
            <form onSubmit={handleOnSubmit}>
                <Input 
                    name="email" 
                    type="text" 
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
	);
};

const mapDispatchToProps = dispatch => ({
    saveUserInState: (token, user) => dispatch(saveUserInState(token, user))
})

export default connect(null, mapDispatchToProps)(LoginPage);
