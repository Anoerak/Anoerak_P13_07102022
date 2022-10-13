import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import App from './App';
import './utils/style//index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
	<Router
		getUserConfirmation={() => {
			/* Empty callback to block the default browser prompt */
		}}
	>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
	// </React.StrictMode>
);
