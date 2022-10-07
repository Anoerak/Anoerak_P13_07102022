import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { test, login, profile, register, modify } from '../../features/serverTest/serverTest.slice';

import './DevButtons.css';

const DevButtons = () => {
	const dispatch = useDispatch();
	const body = useSelector((state) => state.server.body);
	const status = useSelector((state) => state.server.serverStatus);

	const loggingMessage = useSelector((state) => state.server.message);
	const token = useSelector((state) => state.server.token);
	localStorage.setItem('token', token);
	const userToken = localStorage.getItem('token');
	const loggingStatus = useSelector((state) => state.server.loggingStatus);

	const profileMessage = useSelector((state) => state.server.profileMessage);
	const email = useSelector((state) => state.server.email);
	const id = useSelector((state) => state.server.id);
	const firstName = useSelector((state) => state.server.firstName);
	const lastName = useSelector((state) => state.server.lastName);

	const registerMessage = useSelector((state) => state.server.registerMessage);
	const newEmail = useSelector((state) => state.server.newEmail);
	const newPassword = useSelector((state) => state.server.newPassword);
	const newFirstName = useSelector((state) => state.server.newFirstName);
	const newLastName = useSelector((state) => state.server.newLastName);
	const newId = useSelector((state) => state.server.newId);

	const updateMessage = useSelector((state) => state.server.updateMessage);
	const updatedFirstName = useSelector((state) => state.server.updatedFirstName);
	const updatedLastName = useSelector((state) => state.server.updatedLastName);

	const connectionTest = () => {
		axios.get('http://localhost:8080').then((res) => dispatch(test(res)));
	};

	const loginTest = () => {
		let user = {};
		user.email = document.getElementById('email').value;
		user.password = document.getElementById('password').value;
		console.log(user);
		axios.post('http://localhost:8080/api/v1/user/login', user).then((res) => dispatch(login(res)));
	};

	const getProfile = () => {
		axios
			.post(
				'http://localhost:8080/api/v1/user/profile',
				{ key: 'value' },
				{ headers: { Authorization: `Bearer ${userToken}` } }
			)
			.then((res) => dispatch(profile(res)));
	};

	const registerUser = () => {
		let user = {};
		user.email = document.getElementById('email').value;
		user.password = document.getElementById('password').value;
		user.firstName = document.getElementById('firstname').value;
		user.lastName = document.getElementById('lastname').value;

		axios.post('http://localhost:8080/api/v1/user/signup', user).then((res) => dispatch(register(res)));
	};

	const modifyUser = () => {
		let user = {};
		user.firstName = document.getElementById('firstname').value;
		user.lastName = document.getElementById('lastname').value;
		console.log(user);
		axios
			.put('http://localhost:8080/api/v1/user/profile', user, {
				headers: { Authorization: `Bearer ${userToken}` },
			})
			.then((res) => dispatch(modify(res)));
	};

	return (
		<>
			<div className="button">
				<label htmlFor="email">email</label>
				<textarea name="email" id="email" cols="30" rows="2"></textarea>
				<label htmlFor="password">password</label>
				<textarea name="password" id="password" cols="30" rows="2"></textarea>
				<button
					onClick={() => {
						connectionTest();
					}}
				>
					Get (should return the Welcome server's message).
				</button>
				<span>Status : {status}</span>
				<span>Message : {body}</span>

				<button
					onClick={() => {
						loginTest();
					}}
				>
					Post Login (should return a confirmation of login).
				</button>
				<span>Status : {loggingStatus}</span>
				<span>Message : {loggingMessage} </span>
				<span>Token : {userToken} </span>

				<button
					onClick={() => {
						getProfile();
					}}
				>
					Get Profile (should return the user's profile).
				</button>
				<span>Message : {profileMessage}</span>
				<span>email : {email}</span>
				<span>id : {id}</span>
				<span>firstName : {firstName}</span>
				<span>lastName : {lastName}</span>

				<label htmlFor="firstname" className="labelFirstName">
					Prénom
				</label>
				<textarea name="firstname" id="firstname" cols="30" rows="2"></textarea>
				<label htmlFor="lastname">Nom</label>
				<textarea name="lastname" id="lastname" cols="30" rows="2"></textarea>
				<button
					onClick={() => {
						registerUser();
					}}
				>
					Post Register (should return a confirmation of registration).
				</button>
				<span>Message : {registerMessage}</span>
				<span>email : {newEmail}</span>
				<span>password : {newPassword}</span>
				<span>id : {newId}</span>
				<span>firstName : {newFirstName}</span>
				<span>lastName : {newLastName}</span>

				<button
					onClick={() => {
						modifyUser();
					}}
				>
					Put (should return a confirmation of modification).
				</button>
				<span>Message : {updateMessage}</span>
				<span>New FirsName : {updatedFirstName}</span>
				<span>New LastName : {updatedLastName}</span>
			</div>
		</>
	);
};

export default DevButtons;
