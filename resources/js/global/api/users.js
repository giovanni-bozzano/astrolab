/*
	Imports the Roast API URL from the config.
*/
import { CONFIG } from '../../config.js';

export default {
	/*
		GET /api/v1/user
	*/
	getUser: function() {
		return axios.get(CONFIG.URL + 'api/v1/user');
	},

	logout: function() {
		return axios.post(CONFIG.URL + 'logout');
	}
}
