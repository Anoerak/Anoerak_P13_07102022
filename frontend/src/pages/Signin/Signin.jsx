import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';

import Api from '../../api/Api';

import { login, createAccount, getProfile } from '../../features/Users/usersApi.slice';

import './Signin.css';

const Signin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [signUpMode, setSignUpMode] = useState(false);
	const handleSignUpMode = () => setSignUpMode(!signUpMode);
	const apiCall = new Api('http://localhost:8080');

	/**
	 * @description Signin form validation schema
	 * @type {yup.ObjectSchema} schema
	 * @property {string} email - Email address
	 * @property {string} password - Password
	 * @property {string} [confirmPassword] - Confirm password
	 * @property {string} [firstName] - First name
	 * @property {string} [lastName] - Last name
	 */
	const validationSchema = signUpMode
		? yup.object().shape({
				firstName: yup
					.string()
					.required('Prénom requis.')
					.min(2, 'Prénom trop court.')
					.max(20, 'Prénom trop long.'),
				lastName: yup
					.string()
					.required('Nom de Famille requis.')
					.min(2, 'Nom de Famille trop court.')
					.max(20, 'Nom de Famille trop long.'),
				email: yup.string().email('Merci de vérifier votre saisie.').required('Email requis.'),
				password: yup
					.string()
					.required('Mot de passe requis')
					.min(6, '6 caractères minimum')
					.max(20, '20 caractères maximum'),
				confirmPassword: yup
					.string()
					.required('Confirmation du mot de passe requise')
					.oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas'),
		  })
		: yup.object().shape({
				email: yup.string().email('Merci de vérifier votre saisie.').required('Email requis.'),
				password: yup
					.string()
					.required('Mot de passe requis')
					.min(6, '6 caractères minimum')
					.max(20, '20 caractères maximum'),
		  });

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	// Function to handle the persisting of the user's token in the local storage and the redux store
	const rememberMeOption = (rememberMe, res) => {
		if (rememberMe === true) {
			localStorage.setItem('token', res.data.body.token);
		} else {
			sessionStorage.setItem('token', res.data.body.token);
		}
	};

	// Function to handle the signin form submission
	const logIn = (remBol) => {
		// Create a new user object
		let user = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};
		// Check if the user wants to be remembered / is signing up (in which case we won't persist the token)
		let rememberStatus = remBol === 'false' ? remBol : document.getElementById('remember-me').checked;
		// Call the login function from the usersApi.slice
		apiCall.loginUser(user).then((res) => {
			if (res.status === 200) {
				dispatch(login(res));
				rememberMeOption(rememberStatus, res);
				// Call the getProfile function from the usersApi.slice
				apiCall.getUserProfile(user, res.data.body.token).then((res) => {
					dispatch(getProfile(res));
					// Redirect the user to the home page if the login was successful
					navigate('/user');
				});
			} else {
				alert(res.data.message);
			}
		});
		reset();
	};

	// Function to handle the signup form submission
	const signUp = () => {
		// Create a new user object
		let user = {
			firstName: document.getElementById('firstName').value,
			lastName: document.getElementById('lastName').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};
		// Call the createAccount function from the usersApi.slice
		apiCall.registerUser(user).then((response) => {
			dispatch(createAccount(response));
			// Redirect the user to the home page if the signup was successful
			response.status === 200 ? logIn('false') : alert(response.message);
		});
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<FontAwesomeIcon icon={faCircleUser} className="fa fa-user-circle sign-in-icon" />
				{signUpMode ? (
					<>
						<h1>Sign Up</h1>
						<form onSubmit={handleSubmit(signUp)}>
							<div className="input-wrapper">
								<label htmlFor="email">firstName</label>
								<input
									type="text"
									name="firstName"
									id="firstName"
									{...register('firstName')}
									className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
								/>
								<div className="invalid-feedback">{errors.firstName?.message}</div>
							</div>
							<div className="input-wrapper">
								<label htmlFor="email">lastName</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									{...register('lastName')}
									className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
								/>
								<div className="invalid-feedback">{errors.lastName?.message}</div>
							</div>

							<div className="input-wrapper">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									{...register('email')}
									className={`form-control ${errors.email ? 'is-invalid' : ''}`}
								/>
								<div className="invalid-feedback">{errors.email?.message}</div>
							</div>
							<div className="input-wrapper">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									{...register('password')}
									className={`form-control ${errors.password ? 'is-invalid' : ''}`}
								/>
								<div className="invalid-feedback">{errors.password?.message}</div>
							</div>
							<div className="input-wrapper">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									{...register('confirmPassword')}
									className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
								/>
								<div className="invalid-feedback">{errors.confirmPassword?.message}</div>
							</div>
							<div className="buttons-wrapper">
								<button className="validate-button" type="submit">
									Valider
								</button>
								<button
									className="cancel__button"
									onClick={() => {
										handleSignUpMode();
									}}
								>
									Annuler
								</button>
							</div>
						</form>
					</>
				) : (
					<>
						<h1>Sign In</h1>
						<form onSubmit={handleSubmit(logIn)}>
							<div className="input-wrapper">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									name="email"
									id="email"
									{...register('email')}
									className={`form-control ${errors.email ? 'is-invalid' : ''}`}
								/>
								<div className="invalid-feedback">{errors.email?.message}</div>
							</div>
							<div className="input-wrapper">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									{...register('password')}
									className={`form-control ${errors.password ? 'is-invalid' : ''}`}
								/>
								<div className="invalid-feedback">{errors.password?.message}</div>
							</div>
							<div className="input-remember">
								<input type="checkbox" id="remember-me" />
								<label htmlFor="remember-me">Remember me</label>
							</div>
							<button className="sign-in-button" type="submit">
								Sign In
							</button>
							<button
								className="sign-up-button"
								onClick={() => {
									handleSignUpMode();
								}}
							>
								Sign Up
							</button>
						</form>
					</>
				)}
			</section>
		</main>
	);
};

export default Signin;
