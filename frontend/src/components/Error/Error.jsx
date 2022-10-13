import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Error.css';

const Error = () => {
	const userProfile = useSelector((state) => state.users.userProfile);
	return (
		<div className="error__container">
			<h1>{!userProfile.status ? '404' : userProfile.status}</h1>
			<h2>Oups! La page que vous demandez n'existe pas.</h2>
			<Link to={`/`} className="error__link">
				Retourner sur la page d'accueil
			</Link>
		</div>
	);
};

export default Error;
