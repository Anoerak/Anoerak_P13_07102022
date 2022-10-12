import { createSlice } from '@reduxjs/toolkit';

import { Users } from '../../models/UsersModel';

export const usersApiSlice = createSlice({
	name: 'users',
	initialState: {
		serverTest: new Users().connectionTest(),

		loggedUser: new Users().loginUser(),

		userProfile: new Users().getProfileUser(),

		newUser: new Users().createUser(),

		updatedUser: new Users().updateUser(),
	},
	reducers: {
		serverTest: (state, { payload }) => {
			state.serverTest = new Users(payload).connectionTest();
		},
		login: (state, { payload }) => {
			state.loggedUser = new Users(payload).loginUser();
		},
		getProfile: (state, { payload }) => {
			state.userProfile = new Users(payload).getProfileUser();
		},
		register: (state, { payload }) => {
			state.newUser = new Users(payload).createUser();
		},
		update: (state, { payload }) => {
			state.updatedUser = new Users(payload).updateUser();
		},
		logout: (state) => {
			state.loggedUser = new Users().loginUser();
			state.userProfile = new Users().getProfileUser();
			state.updatedUser = new Users().updateUser();
			state.newUser = new Users().createUser();
			state.serverTest = new Users().connectionTest();
		},
	},
});

export const { serverTest, login, getProfile, register, update, logout } = usersApiSlice.actions;

export default usersApiSlice.reducer;
