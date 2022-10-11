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

	async init() {
		const res = await this.connectionTest();
		this._data = res;
		return this._data;
	}
}
