/*
	Imports the Roast API URL from the config.
*/
import { CONFIG } from '../../config.js';

export default {
	/*
		GET /api/v1/admin/pois/suggested
	*/
	getSuggestedPois: function() {
		return axios.get(CONFIG.URL + 'api/v1/admin/pois/suggested');
	},

	/*
		POST /api/v1/admin/pois/publish
	*/
	publishNewPoi: function(id, name, address, description, category_id, hashtag, latitude, longitude) {
		/*
			Initialize the form data
		*/
		let formData = new FormData();

		/*
			Add the form data we need to submit
		*/
		formData.append('id', id);
		formData.append('name', name);
		formData.append('address', address);
		formData.append('description', description);
		formData.append('category_id', category_id);
		formData.append('hashtag', hashtag);
		formData.append('latitude', latitude);
		formData.append('longitude', longitude);

		return axios.post(CONFIG.URL + 'api/v1/admin/pois/publish', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}
}
