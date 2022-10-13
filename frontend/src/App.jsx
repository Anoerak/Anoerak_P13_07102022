import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import UserAccount from './pages/UserAccount/UserAccount';
import Error from './components/Error/Error';

import './utils/style/App.css';

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Signin />} />
				<Route path="/user" element={<UserAccount />} />
				<Route path="*" element={<Error />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
