import axios from 'axios';

export default class Api {
	constructor(url) {
		this.url = url;
		this._data = {};
	}

	async connectionTest() {
		try {
			const res = await axios.get(this.url);
			return res;
		} catch (err) {
			return err;
		}
	}

	async loginUser(user) {
		try {
			const res = await axios.post(this.url + '/api/V1/user/login', user);
			return res;
		} catch (err) {
			return err.response;
		}
	}

	async getUserProfile(user, token) {
		this._user = user;
		this._token = token;
		try {
			const res = await axios.post(
				this.url + '/api/V1/user/profile',
				{ key: 'value' },
				{
					headers: {
						Authorization: `Bearer ${this._token}`,
					},
				}
			);
			return res;
		} catch (err) {
			return err.response;
		}
	}

	async registerUser(user) {
		try {
			const res = await axios.post(this.url + '/api/V1/user/signup', user);
			return res;
		} catch (err) {
			return err.response;
		}
	}

	async updateUserProfile(user, token) {
		this._user = user;
		this._token = token;
		try {
			const res = await axios.put(this.url + '/api/V1/user/profile', this._user, {
				headers: {
					Authorization: `Bearer ${this._token}`,
				},
			});
			return res;
		} catch (err) {
			return err.response;
		}
	}

	logoutUser() {
		localStorage.removeItem('token');
	}
}
