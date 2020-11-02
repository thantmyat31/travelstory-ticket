import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './Header.module.css';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/user/user.action';
import Button from '../Button/Button';

const Header = ({ currentUser, userLogout }) => {
	const history = useHistory();

	const logout = () => {
		userLogout();
		localStorage.setItem('auth-token', '');
		history.push("/login");
    }
	return (
		<header className={styles.header}>
			<Link className={styles.logo} to="/">
				MERN auth
			</Link>
			{!currentUser ? (
				<div className={styles.navLinks}>
					<Link className={styles.link} to="/login">
						Login
					</Link>
					<Link className={styles.link} to="/register">
						Register
					</Link>
				</div>
			) : (
				<div className={styles.navLinks}>
                    <Button title="Logout" onClick={logout} />
				</div>
			)}
		</header>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
