import { configureStore } from '@reduxjs/toolkit';
import userApiReducer from '../features/Users/usersApi.slice';

/**
 * @param {Object} payload - The state of the redux slice
 */
export const store = configureStore({
	reducer: {
		users: userApiReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
