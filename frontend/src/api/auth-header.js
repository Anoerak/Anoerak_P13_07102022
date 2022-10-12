export default function authHeader() {
	const user = localStorage.getItem('token');

	if (user && user.accessToken) {
		return { Authorization: 'Bearer ' + user.accessToken };
	} else {
		return {};
	}
}
