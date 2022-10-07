export const connectionTest = async () => {
	const response = await fetch('http://localhost:8080', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	return data;
};
