export class Users {
	constructor(res) {
		console.log('data', res);
		this.res = res;
		this._connectionTest = {};
		this._loggedUser = {};
		this._profile = {};
		this._newUser = {};
		this._updatedUser = {};
	}

	connectionTest() {
		!this.res
			? (this._connectionTest = {
					message: null,
					status: null,
			  })
			: this.res.status === 200
			? (this._connectionTest = {
					message: this.res.data,
					status: this.res.status,
			  })
			: (this._connectionTest = {
					message: this.res.message,
					status: this.res.code,
			  });

		return this._connectionTest;
	}

	loginUser() {
		!this.res
			? (this._loggedUser = {
					message: null,
					token: '',
					status: null,
			  })
			: this.res.status === 200
			? (this._loggedUser = {
					message: this.res.data.message,
					token: this.res.data.body.token,
					status: this.res.status,
			  })
			: (this._loggedUser = {
					message: this.res.data.message,
					token: 'No token available',
					status: this.res.status,
			  });
		return this._loggedUser;
	}

	getProfileUser() {
		!this.res
			? (this._profile = {
					message: null,
					email: '',
					id: '',
					firstName: '',
					lastName: '',
					status: null,
			  })
			: this.res.status === 200
			? (this._profile = {
					message: this.res.data.message,
					email: this.res.data.body.email,
					id: this.res.data.body.id,
					firstName: this.res.data.body.firstName,
					lastName: this.res.data.body.lastName,
					status: this.res.status,
			  })
			: (this._profile = {
					message: this.res.data.message,
					email: '',
					id: '',
					firstName: '',
					lastName: '',
					status: this.res.status,
			  });

		return this._profile;
	}

	createUser() {
		!this.res
			? (this._newUser = {
					message: null,
					email: '',
					id: '',
					firstName: '',
					lastName: '',
					status: null,
					statusText: null,
			  })
			: this.res.status === 200
			? (this._newUser = {
					message: this.res.message,
					status: this.res.status,
					statusText: this.res.statusText,
					email: this.res.data.body.email,
					id: this.res.data.body._id,
					firstName: this.res.data.body.firstName,
					lastName: this.res.data.body.lastName,
			  })
			: (this._newUser = {
					message: this.res.data.message,
					status: this.res.status,
					statusText: this.res.statusText,
					email: '',
					id: '',
					firstName: '',
					lastName: '',
			  });
		return this._newUser;
	}

	updateUser() {
		!this.res
			? (this._modifiedUser = {
					message: null,
					status: null,
					firstName: '',
					lastName: '',
			  })
			: this.res.status === 200
			? (this._modifiedUser = {
					message: this.res.data.message,
					status: this.res.status,
					firstName: this.res.data.body.firstName,
					lastName: this.res.data.body.lastName,
			  })
			: (this._modifiedUser = {
					message: this.res.statusText,
					status: this.res.status,
			  });
		return this._modifiedUser;
	}
}
