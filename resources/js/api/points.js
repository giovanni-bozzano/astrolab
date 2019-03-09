/*
	Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
	/*
		GET /api/v1/points
	*/
	getPoints: function() {
		return axios.get(CONFIG.API_URL + '/points');
	},

	/*
		GET /api/v1/points/{pointId}
	*/
	getPoint: function(pointId) {
		return axios.get(CONFIG.API_URL + '/points/' + pointId);
	},

	/*
		POST /api/v1/points
	*/
	postAddNewPoint: function(name, address, description, category_id, latitude, longitude) {
		/*
			Initialize the form data
		*/
		let formData = new FormData();

		/*
			Add the form data we need to submit
		*/
		formData.append('name', name);
		formData.append('address', address);
		formData.append('description', description);
		formData.append('category_id', category_id);
		formData.append('latitude', latitude);
		formData.append('longitude', longitude);

		return axios.post(CONFIG.API_URL + '/points', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}
}
