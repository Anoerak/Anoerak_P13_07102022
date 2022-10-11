import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import './Signin.css';

const Signin = () => {
	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<FontAwesomeIcon icon={faCircleUser} className="fa fa-user-circle sign-in-icon" />
				<h1>Sign In</h1>
				<form>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					{/* PLACEHOLDER DUE TO STATIC SITE */}
					{/* <a href="./user.html" className="sign-in-button">
						Sign In
					</a> */}
					{/* SHOULD BE THE BUTTON BELOW  */}
					<button className="sign-in-button">Sign In</button>
				</form>
			</section>
		</main>
	);
};

export default Signin;
