export class CallAPI {
	constructor(user) {
		this.baseURL = 'http://localhost:8080/api/v1/user';
		this.user = !user
			? {
					email: 'steve@rogers.com',
					password: 'password456',
			  }
			: user;
		this.token = !localStorage.getItem('token') ? '' : localStorage.getItem('token');
	}

	async login() {
		const response = await fetch(`${this.baseURL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.user),
		});

		const data = await response.json();
		!localStorage.getItem('token')
			? localStorage.setItem('token', data.body.token)
			: console.log('User already logged in');
		return data;
	}

	async getUserProfile(token) {
		await this.login();
		const response = await fetch(`${this.baseURL}/profile`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});

		const data = await response.json();
		return data;
	}
}
