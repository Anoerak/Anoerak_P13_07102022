import React from 'react';

import './Loader.css';

/**
 * Display the Loader component when data is loading
 * @returns {React.Component} Loader component
 */
const Loader = () => {
	return (
		<div className="loader__container">
			<div className="loader"></div>
		</div>
	);
};

export default Loader;
