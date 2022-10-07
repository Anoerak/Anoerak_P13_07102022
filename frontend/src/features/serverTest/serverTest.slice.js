import { createSlice } from '@reduxjs/toolkit';

export const serverSlice = createSlice({
	name: 'server',
	initialState: {
		serverStatus: null,
		body: null,

		message: null,
		token: null,
		loggingStatus: null,

		profileMessage: null,
		email: null,
		id: null,
		firstName: null,
		lastName: null,

		registerMessage: null,
		newEmail: null,
		newId: null,
		newFirstName: null,
		newLastName: null,
		newPassword: null,

		updateMessage: null,
		updatedFirstName: null,
		updatedLastName: null,
	},
	reducers: {
		test: (state, { payload }) => {
			state.body = payload.data;
			state.serverStatus = payload.status;
		},
		login: (state, { payload }) => {
			state.loggingStatus = payload.status;
			state.message = payload.data.message;
			state.token = payload.data.body.token;
		},
		profile: (state, { payload }) => {
			state.profileMessage = payload.data.message;
			state.email = payload.data.body.email;
			state.id = payload.data.body.id;
			state.firstName = payload.data.body.firstName;
			state.lastName = payload.data.body.lastName;
		},
		register: (state, { payload }) => {
			state.registerMessage = payload.data.message;
			state.newEmail = payload.data.body.email;
			state.newId = payload.data.body._id;
			state.newFirstName = payload.data.body.firstName;
			state.newLastName = payload.data.body.lastName;
			state.newPassword = payload.data.body.password;
		},
		modify: (state, { payload }) => {
			state.updateMessage = payload.data.message;
			state.updatedFirstName = payload.data.body.firstName;
			state.updatedLastName = payload.data.body.lastName;
		},
	},
});

export const { test, login, profile, register, modify } = serverSlice.actions;

export default serverSlice.reducer;
