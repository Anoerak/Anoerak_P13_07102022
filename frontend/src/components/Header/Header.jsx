import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import './Header.css';
import argentBankLogo from '../../assets/img/argentBankLogo.png';

const Header = () => {
	return (
		<nav className="main-nav">
			<Link to="/" className="main-nav-logo">
				<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<Link to="/login" className="main-nav-item">
				<FontAwesomeIcon icon={faCircleUser} /> Sign In
			</Link>
		</nav>
	);
};

export default Header;
