import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, method) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios({
					method,
					url,
				});
				return res;
			} catch (error) {
				return error;
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url, method]);

	return { loading };
};

export default useAxios;
