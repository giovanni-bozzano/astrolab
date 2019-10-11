/*
	Imports the Roast API URL from the config.
*/
import { CONFIG } from '../../config.js';

export default {
	/*
		GET /api/v1/pois
	*/
	getPois: function() {
		return axios.get(CONFIG.URL + 'api/v1/pois');
	},

	/*
		GET /api/v1/pois/{poiId}
	*/
	getPoi: function(poiId) {
		return axios.get(CONFIG.URL + 'api/v1/pois/' + poiId);
	},

	/*
		POST /api/v1/pois
	*/
	suggestNewPoi: function(name, address, description, category_id, latitude, longitude) {
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

		return axios.post(CONFIG.URL + 'api/v1/pois/suggest', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}
}
