import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logout } from '../../features/Users/usersApi.slice';
import Api from '../../api/Api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './Header.css';
import argentBankLogo from '../../assets/img/argentBankLogo.png';

const Header = () => {
	const dispatch = useDispatch();
	const url = 'http://localhost:8080';
	const apiCall = new Api(url);

	useEffect(() => {
		let user = {};
		let token = localStorage.getItem('token');
		apiCall.getUserProfile(user, token).then((res) => {
			dispatch(getProfile(res));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const userProfile = useSelector((state) => state.users.userProfile);

	const logOut = () => {
		localStorage.clear();
		apiCall.logoutUser().then((res) => {
			dispatch(logout(res));
		});
	};

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
					<Link
						onClick={() => {
							logOut();
						}}
						to="/"
						className="main-nav-item"
					>
						<FontAwesomeIcon icon={faRightFromBracket} className="fa fa-sign-out" /> Sign Out
					</Link>
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
