import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import Api from '../../api/Api';

import { login } from '../../features/Users/usersApi.slice';

import './Signin.css';

const Signin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const url = 'http://localhost:8080';
	const apiCall = new Api(url);

	const validationSchema = yup.object().shape({
		email: yup.string().email('Merci de vérifier votre saisie').required('Email requis'),
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

	const onSubmit = (data) => {
		console.log(data);
		let user = {};
		user.email = document.getElementById('email').value;
		user.password = document.getElementById('password').value;
		apiCall.loginUser(user).then((res) => {
			dispatch(login(res));
			res.status === 200 ? navigate('/user') : alert(res.data.message);
			localStorage.setItem('token', res.data.body.token);
			window.location.reload();
		});
		reset();
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<FontAwesomeIcon icon={faCircleUser} className="fa fa-user-circle sign-in-icon" />
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
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
				</form>
			</section>
		</main>
	);
};

export default Signin;
