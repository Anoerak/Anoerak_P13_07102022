import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Api from '../../api/Api';

import { serverTest, login, getProfile, register, update } from '../../features/Users/usersApi.slice';

import './DevButtons.css';

const DevButtons = () => {
	const dispatch = useDispatch();
	const url = 'http://localhost:8080';
	const apiCall = new Api(url);

	const getDatas = (method, selector, token) => {
		let user = {};
		user.email = document.getElementById('email').value;
		user.password = document.getElementById('password').value;
		user.firstName = document.getElementById('firstName').value;
		user.lastName = document.getElementById('lastName').value;
		apiCall[method](user, token).then((res) => {
			dispatch(selector(res));
		});
	};

	const serverStatus = useSelector((state) => state.users.serverTest);

	const loggedInfos = useSelector((state) => state.users.loggedUser);
	localStorage.setItem('token', loggedInfos.token);
	const userToken = localStorage.getItem('token');
	const userProfile = useSelector((state) => state.users.userProfile);
	const newUser = useSelector((state) => state.users.newUser);
	const updatedUser = useSelector((state) => state.users.updatedUser);

	// const connectionTest = () => {
	// 	axios
	// 		.get('http://localhost:8080')
	// 		.then((res) => dispatch(serverTest(res)))
	// 		.catch((err) => dispatch(serverTest(err)));
	// };

	const loginUser = () => {
		let user = {};
		user.email = document.getElementById('email').value;
		user.password = document.getElementById('password').value;
		axios
			.post('http://localhost:8080/api/v1/user/login', user)
			.then((res) => dispatch(login(res)))
			.catch((err) => dispatch(login(err.response)));
	};

	const getUserProfile = () => {
		axios
			.post(
				'http://localhost:8080/api/v1/user/profile',
				{ key: 'value' },
				{ headers: { Authorization: `Bearer ${userToken}` } }
			)
			.then((res) => dispatch(getProfile(res)))
			.catch((err) => dispatch(getProfile(err.response)));
	};

	const registerUser = () => {
		let user = {};
		user.email = document.getElementById('email').value;
		user.password = document.getElementById('password').value;
		user.firstName = document.getElementById('firstname').value;
		user.lastName = document.getElementById('lastname').value;

		axios
			.post('http://localhost:8080/api/v1/user/signup', user)
			.then((res) => dispatch(register(res)))
			.catch((err) => dispatch(register(err.response)));
	};

	const updateUserInfos = () => {
		let user = {};
		user.firstName = document.getElementById('firstname').value;
		user.lastName = document.getElementById('lastname').value;

		axios
			.put('http://localhost:8080/api/v1/user/profile', user, {
				headers: { Authorization: `Bearer ${userToken}` },
			})
			.then((res) => dispatch(update(res)))
			.catch((err) => dispatch(update(err.response)));
	};

	return (
		<>
			<div className="button">
				<label htmlFor="email">email</label>
				<textarea name="email" id="email" cols="30" rows="2"></textarea>
				<label htmlFor="password">password</label>
				<textarea name="password" id="password" cols="30" rows="2"></textarea>
				<button onClick={() => getDatas('connectionTest', serverTest)}>
					Get (should return the Welcome server's message).
				</button>
				<span>Status : {serverStatus.status}</span>
				<span>Message : {serverStatus.message}</span>

				<button
					onClick={() => {
						loginUser();
					}}
				>
					Post Login (should return a confirmation of login).
				</button>
				<span>Status : {loggedInfos.status}</span>
				<span>Message : {loggedInfos.message} </span>
				<span>Token : {userToken} </span>

				<button
					onClick={() => {
						getUserProfile();
					}}
				>
					Get Profile (should return the user's profile).
				</button>
				<span>Message : {userProfile.message}</span>
				<span>email : {userProfile.email}</span>
				<span>id : {userProfile.id}</span>
				<span>firstName : {userProfile.firstName}</span>
				<span>lastName : {userProfile.lastName}</span>

				<label htmlFor="firstName" className="labelFirstName">
					Prénom
				</label>
				<textarea name="firstName" id="firstName" cols="30" rows="2"></textarea>
				<label htmlFor="lastName">Nom</label>
				<textarea name="lastName" id="lastName" cols="30" rows="2"></textarea>
				<button
					onClick={() => {
						registerUser();
					}}
				>
					Post Register (should return a confirmation of registration).
				</button>
				<span>
					Status :{newUser.status} {newUser.statusText}
				</span>
				<span>Message : {newUser.message}</span>
				<span>email : {newUser.email}</span>
				<span>password : {newUser.password}</span>
				<span>id : {newUser.id}</span>
				<span>firstName : {newUser.firstName}</span>
				<span>lastName : {newUser.lastName}</span>

				<button
					onClick={() => {
						updateUserInfos();
					}}
				>
					Put (should return a confirmation of modification).
				</button>
				<span>
					Status: {updatedUser.status} {updatedUser.statusText}
				</span>
				<span>Message : {updatedUser.message}</span>
				<span>New FirsName : {updatedUser.firstName}</span>
				<span>New LastName : {updatedUser.lastName}</span>
			</div>
		</>
	);
};

export default DevButtons;
