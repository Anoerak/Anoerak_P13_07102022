import React, { useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logout } from '../../features/Users/usersApi.slice';
import Api from '../../api/Api';

import './Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import argentBankLogo from '../../assets/img/argentBankLogo.png';

/**
 * Display the header of the application
 * @returns {React.Component}
 */
const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// Prepare the api call
	let apiCall = useMemo(() => new Api('http://localhost:8080'), []);
	let user = useMemo(() => {}, []);
	// Check the storages to see if the user is logged in
	let token = !localStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token');
	const userProfile = useSelector((state) => state.users.userProfile);
	// Get the user profile and dispatch to Redux Store
	const checkCredentials = useCallback(() => {
		apiCall.getUserProfile(user, token).then((res) => {
			dispatch(getProfile(res));
		});
	}, [apiCall, dispatch, user, token]);

	useEffect(() => {
		checkCredentials();
	}, [checkCredentials]);
	// Logout the user by clearing the storage and redirect to the login page
	const logOut = useCallback(() => {
		sessionStorage.clear();
		localStorage.clear();
		dispatch(logout());
		navigate('/');
	}, [dispatch, navigate]);

	return (
		<nav className="main-nav">
			<Link to="/" className="main-nav-logo">
				<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			{userProfile.status === 200 ? (
				<div className="nav-icons">
					<Link to="/user" className="main-nav-item">
						<FontAwesomeIcon icon={faCircleUser} className="fa fa-user-circle" />
						<p className="main-nav-link-text">{userProfile.firstName}</p>
					</Link>
					<button
						onClick={() => {
							logOut();
						}}
						className="main-nav-item main-nav-itm-button"
					>
						<FontAwesomeIcon icon={faRightFromBracket} className="fa fa-sign-out" />
						<p className="main-nav-link-text">Sign Out</p>
					</button>
				</div>
			) : (
				<div className="main-nav-item">
					<Link to="/login" className="main-nav-item">
						<FontAwesomeIcon icon={faCircleUser} className="fa fa-user-circle" /> Sign In
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Header;
