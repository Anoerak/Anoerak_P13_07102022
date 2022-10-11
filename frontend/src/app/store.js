import { configureStore } from '@reduxjs/toolkit';
import userApiReducer from '../features/Users/usersApi.slice';

export const store = configureStore({
	reducer: {
		users: userApiReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
