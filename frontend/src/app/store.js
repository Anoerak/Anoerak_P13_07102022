import { configureStore } from '@reduxjs/toolkit';
import serverReducer from '../features/serverTest/serverTest.slice';

export const store = configureStore({
	reducer: {
		server: serverReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
