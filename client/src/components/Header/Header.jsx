import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutAction } from './../../redux/user/user.action';

import styles from './Header.module.css';
import cx from 'classnames';

import {FaPaperPlane} from 'react-icons/fa';
import {BiMenuAltRight} from 'react-icons/bi';
import UserAvatar from '../UserAvatar/UserAvatar';

const Header = () => {
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);
	const [ isDrop, setIsDrop ] = useState(false);
	const { isAuth, user } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(userLogoutAction());
    }
	const handleOnMenuClose = (event) => {
		event.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	}

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Link className={styles.logo} to="/">
					<FaPaperPlane className={styles.logoIcon} /> TravelStory
				</Link>
				<div className={cx(styles.navLinks, styles.right)}>
					<Link className={styles.link} to="/">
						Home
					</Link>
				</div>
			</div>
			{!isAuth ? (
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
					<span className={styles.userInfo} onClick={() => setIsDrop(!isDrop)}>
						<UserAvatar user={user} style={{ cursor: "pointer" }} />
						{isDrop && <div className={styles.dropdown}>
							{
								user.role === 'admin' || user.role === 'master_admin' ? 
								<Link className={styles.link} to="/auth/admin">
									Admin
								</Link>: 
								<Link className={styles.link} to="/auth/dashboard">
									Dashboard
								</Link>
							}
							<p className={styles.link} onClick={logout}>
								Logout
							</p>
						</div>}
					</span>
				</div>
			)}
			<div className={styles.menuContainer} onClick={handleOnMenuClose}>
				<BiMenuAltRight className={styles.menu} onClick={handleOnMenuClose} />
				<div className={isMenuOpen ? cx(styles.menuOverlay, styles.open) :styles.menuOverlay}>
					<Link className={styles.link} to="/">
						Home
					</Link>
					{!isAuth ? (
						<div>
							<Link className={styles.link} to="/login">
								Login
							</Link>
							<Link className={styles.link} to="/register">
								Register
							</Link>
						</div>
					) : (
						<div>
							{
								user.role === 'admin' || user.role === 'master_admin' ?
								<Link className={styles.link} to="/auth/admin">
									Admin
								</Link> :
								<Link className={styles.link} to="/auth/dashboard">
									Dashboard
								</Link>
							}
							<p className={styles.link} onClick={logout}>
								Logout
							</p>
						</div>
					)}
					<span className={styles.close} onClick={handleOnMenuClose}>&times;</span>
				</div>
			</div>
		</header>
	);
};

export default Header;