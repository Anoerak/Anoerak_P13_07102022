import React from 'react';
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
						getDatas('loginUser', login);
					}}
				>
					Post Login (should return a confirmation of login).
				</button>
				<span>Status : {loggedInfos.status}</span>
				<span>Message : {loggedInfos.message} </span>
				<span>Token : {userToken} </span>

				<button
					onClick={() => {
						getDatas('getUserProfile', getProfile, userToken);
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
						getDatas('registerUser', register);
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
						getDatas('updateUserProfile', update, userToken);
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
